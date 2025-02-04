import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());


// ----Route for user authentication
app.use("/api/auth", authRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});