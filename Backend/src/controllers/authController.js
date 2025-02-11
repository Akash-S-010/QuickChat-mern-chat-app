import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


// user signUp function-------------------------------
export const signup = async (req, res) => {

    const { email, fullName, password } = req.body;


    try {

        if (!email || !fullName || !password) {
            return res.status(400).send("All fields are required");
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exist with this email" });
        }

        // Password hashing---
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            // if newUser created , generate token and send in cookies and save--
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                userName: newUser.fullName,
                email: newUser.email
            });

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signupController", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


// user login function---------------------------------
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            userName: user.fullName,
            email: user.email
        })


    } catch (error) {

        console.log("Error in loginController", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}

// user logout function-------------------------------
export const logout = (req, res) => {
    
    try {

        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logout successfully"});

    } catch (error) {
        console.log("Error in logoutController", error.message);
    }
}


// user profile update function--(protected route )-----------------------------
export const updateProfile = async (req, res) => {

    try {

        const {profilePic} = req.body;
        const userId = req.user._id
        
        if(!profilePic){
            return res.status(400).json({message:"Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await user.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

        res.status(200).json(updateUser);

    } catch (error) {
        
        console.log("Error in update profile",error)
    }    
}


export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user);
        
    } catch (error) {

        console.log("Error in checkAuth controller",error);
        res.status(500).json({message:"Internal server error"})
        
    }
}


