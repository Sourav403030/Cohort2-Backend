import express, {Request, Response} from "express"
import { User, userModel } from "../models/userModel";
import bcrypt from "bcrypt"
import generateOtp from "../helpers/otp";
import jwt from "jsonwebtoken"

export const authRouter =  express.Router();

authRouter.post("/register", async (req: Request, res: Response)=>{
    const {username, email, password} = req.body;
    const result = User.safeParse(req.body);

    if(!result.success){
        return res.status(401).json({
            message: "Not valid credentials",
            error: result.error
        })
    }

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(409).json({
            message: "User already exists",
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        otp: generateOtp()
    })

    res.status(201).json({
        message: "User created successfully",
        newUser
    })
})

authRouter.post("/login", async (req: Request, res: Response)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "Email and Password required",
        })
    }

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(401).json({
            message: "No user exists",
        })
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword){
        return res.status(401).json({
            message: "Incorrect Email or Password",
        })
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET){
        return res.status(400).json({
            message: "No JWT Secret provided"
        })
    }

    const token = jwt.sign({id: user._id}, JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
        message: "User LoggedIn Successfully"
    })

})