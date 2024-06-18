import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match: [/^[A-Za-z0-9._-]+@+[A-Za-z0-9.-]+.+[A-Za-z]{2,4}$/, 'Enter a valid email address']
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        match:[/^[0-9]{10}/,'Enter valid mobile number']
    },
    gender:{
        type:String,
        required:true,
        default:"NA"
    },
    security :{
        type:String,
        required:true
    }
},{timestamps:true});

export default mongoose.model('users',userSchema);