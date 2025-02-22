import express from "express";
import cors from "cors";
import router from "./routes/userRoute.js";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
dotenv.config();
const app=express();

const PORT = process.env.PORT || 3300;

dbConnection();


app.use(express.json());
app.use(cors());


app.use("/api/v1",router);

app.listen(PORT,()=>{
    console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`);
})