import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET;
export const generateToken=(user)=>{
    const payload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      roles: user.roles,
    };
    return jwt.sign(payload,SECRET_KEY,{expiresIn:"24h"});
}