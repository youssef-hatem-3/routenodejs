import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
export const dbconnection = ()=>{mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('Database connected');
})}
