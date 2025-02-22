import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI;

const dbConnection=async function(){
    try {
        const conn=await mongoose.connect(URI);
        console.log(
          `[${new Date().toISOString()}] Database connected successfully.`
        );
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
}
export default dbConnection;