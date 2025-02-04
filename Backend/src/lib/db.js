import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async()=>{
    try {

        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DB connected :${connect.connection.host}`);

    } catch (error) {
     
        console.log("DB connection error",error);
    }
}