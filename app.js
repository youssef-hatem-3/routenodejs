import dotenv from 'dotenv'
import express from 'express'
import { dbconnection } from './DB/connection.js'
import userRouter from './modules/users/user.router.js'
import messageRouter from './modules/message/message.router.js'
dotenv.config()
const baseUrl = process.env.BASEURL
const app = express()
const port = process.env.port
app.use(express.json())
app.use(baseUrl , userRouter)
app.use(baseUrl ,messageRouter)
app.get('/' ,(req,res)=>{
    res.send('hello world')
})
dbconnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

