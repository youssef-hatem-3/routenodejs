import { messageModel } from '../../../models/message/message.model.js'
import { userModel } from './../../../models/user/user.model.js';

export const sendMessage = async (req, res) => {
        const { userId } = req.params;
        const { message } = req.body ;
        const user = await userModel.findById(userId)
        if (user) {
           const messageDetails = await messageModel.insertMany({ userId , message })
            res.json({ message: 'success', user , message , messageDetails })
        } else {
            res.json({ message: 'in-valid user' })
        }

}
 
export const myMessages = async (req, res) => {
       const messagesList = await messageModel.find({ userId : req.id })
        res.json({ message: 'success', messagesList })

}