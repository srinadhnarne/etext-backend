import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
    console.log('Database Connection Successful');
}).catch((error)=>{
    console.log(error);
});

export default connectDB;