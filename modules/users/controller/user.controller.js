import dotenv from 'dotenv'
import { userModel  } from '../../../models/user/user.model.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../../emails/user.email.js'
dotenv.config()

export const signUp =  async(req,res)=>{
    const { name , email , password , age } = req.body ;
    const user = await userModel.findOne({email});
    if(user)
    {
        res.send('this email elready exists')
    }
    else
    {
        bcrypt.hash(password, parseInt(process.env.saltRound), async function(err, hash) {
            await userModel.insertMany( { name , email , password:hash , age } ) 
            let token = jwt.sign({email},`${process.env.tokenSignature}`)
            let link = `<a href=${req.protocol}://${req.headers.host}${process.env.BASEURL}/verify/${token}>Verify</a>`
            sendEmail({email, token , message:'hello' , link})
            res.send({message:'success',token})
        });
    }
} 

export const emailVerify = async (req,res)=>{
    const {token} = req.params ; 
    jwt.verify(token,`${process.env.tokenSignature}`,async (err,decoded)=>{
        if (err) {
            res.json(err)
        } else {
            let user = await userModel.findOne({email:decoded.email })
            if (user) {
                await userModel.findOneAndUpdate({email:decoded.email},{emailConfirm : true})
                res.json('verified')
            } else {
                res.json({message : 'user not found '})
            }  
        }
    })
}


export const signIn =  async(req,res)=>{
    const {email , password} = req.body ;
    const user = await userModel.findOne({email});
    if(user)
    {
        const match = await bcrypt.compare(password, user.password);
        if(match)
        {
           const token = jwt.sign({role:'user',userId:user._id,name:user.Name, isLoggedIn : true},`${process.env.tokenSignature}`, {expiresIn:60*60})
            res.json({message:'success',token,user})
        }
        else
        {
            res.json({message:'password incorrect',user})
        }
    }
    else
    {
        res.json({message:'email doesnt exists '})
    }
}

export const userProfile =  async(req,res)=>{
    const user = await userModel.findById(req.id)
    res.send({message :'user module' , user} )
}

export const getShareProfile =  async(req,res)=>{
    const {id} = req.params
    const user = await userModel.findById(id).select('name profilePic coverPic')
    res.send({message :'user module' , user} )
}
 
export const updateUser =  async(req,res)=>{
    await userModel.updateOne({_id:'632c3f18c0c1ce338d6c4802'},{firstName:"ahmed"}) 
    res.send('updated')
}

export const deleteUser =  async(req,res)=>{
    const {_id} = req.body ;
    await userModel.deleteOne({_id}) 
    res.send('deleted')
}

export const getUsers =  async(req,res)=>{
    let users = await userModel.find({}) 
    res.send(users)
}


