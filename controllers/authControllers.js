import { comparePassword, generateToken, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'

export const registerController = async(req,res)=>{
    try {
        const {name,email,password,phone,gender,security} =  req.body;
        if(!name){
            return res.status(501).send({
                success:false,
                message:"Enter Name"
            })
        }
        if(!email){
            return res.status(501).send({
                success:false,
                message:"Enter email"
            })
        }
        if(!password){
            return res.status(501).send({
                success:false,
                message:"Enter Password"
            })
        }
        if(!phone){
            return res.status(501).send({
                success:false,
                message:"Enter Mobile Number"
            })
        }
        if(!security){
            return res.status(501).send({
                success:false,
                message:"Enter Security Answer"
            })
        }
        if(!gender || gender=='NA'){
            return res.status(501).send({
                success:false,
                message:"Select Gender"
            })
        }
        
        const validEmail = /^[A-Za-z0-9._-]+@+[A-Za-z0-9.-]+.+[A-Za-z]{2,4}$/;
        const validMobile = /^[0-9]{10}$/;
        if(!validEmail.test(email)){
            return res.status(501).send({
                success:false,
                message:"Enter valid email"
            })
        }
        if(!validMobile.test(phone)){
            return res.status(501).send({
                success:false,
                message:"Enter valid mobile number"
            })
        }
    
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(501).send({
                success:false,
                message:"User with same email exist"
            })
        }
        const hashedPassword = await hashPassword(password);
        await new userModel({
            name,
            password:hashedPassword,
            email,
            phone,
            gender,
            security
        }).save();
        res.status(200).send({
            success:true,
            message:"User Registered",
            user:{
                name,email,phone,gender
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in registration"
        })
    }

}

export const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email){
            return res.status(501).send({
                success:false,
                message:"Enter email"
            })
        }
        if(!password){
            return res.status(501).send({
                success:false,
                message:"Enter Password"
            })
        }
        const existingUser = await userModel.findOne({email}).select("-security");
        if(!existingUser) {
            return res.status(501).send({
                success:false,
                message:"Invalid Credentials"
            })
        }
        const correctPassword = await comparePassword(password,existingUser.password);
        if(!correctPassword) {
            return res.status(400).send({
                success:false,
                message:"Invalid Password"
            })
        }
        const token = await generateToken(existingUser._id);
        res.status(200).send({
            success:true,
            message:"Login Successful",
            user:{
                name:existingUser.name,
                email:existingUser.email,
                phone:existingUser.phone,
                gender:existingUser.gender
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login"
        })
    }
}

export const forgotPasswordController = async(req,res)=>{
    try {
        const {email,security,password} = req.body;
        if(!email){
            return res.status(501).send({
                success:false,
                message:"Enter email"
            })
        }
        if(!security){
            return res.status(501).send({
                success:false,
                message:"Enter Security Answer"
            })
        }
        const existingUser = await userModel.findOne({email}).select("security");
        if(!existingUser) {
            return res.status(501).send({
                success:false,
                message:"Invalid Credentials"
            })
        }
        if(existingUser?.security!==security){
            return res.status(501).send({
                success:false,
                message:"Invalid security answer"
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = await userModel.findOneAndUpdate({email},{
            password:hashedPassword
        });
        res.status(200).send({
            success:true,
            message:"Password Reset Successful"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login"
        })
    }
}

export const updateController = async(req,res)=>{
    
}

export const testContoller = async(req,res)=>{
    const data = await userModel.find({});
    if(data) console.log(data);
    res.status(200).send({
        success:true,
        message:"API WORKING"
    })
}