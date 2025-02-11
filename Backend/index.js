import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


// ----Route for user authentication
app.use("/api/auth", authRoutes)

// ----Route for messages
app.use("/api/message", messageRoutes)




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});