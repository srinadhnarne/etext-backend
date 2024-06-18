import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

export const hashPassword = async (password)=>{
    const salt = 10;
    const hashedPassword = bcrypt.hash(password,salt);
    return hashedPassword;
}

export const comparePassword = async (password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword);
}

export const generateToken = async (id)=>{
    const token = JWT.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"});
    return token;
}