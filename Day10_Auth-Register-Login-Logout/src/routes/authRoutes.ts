import express, {Request, Response} from "express"
import { User, userModel } from "../models/userModel";
import bcrypt from "bcrypt"
import generateOtp from "../helpers/otp";

export const authRouter =  express.Router();

authRouter.post("/register", async (req: Request, res: Response)=>{
    const {username, email, password} = req.body;
    const result = User.safeParse(req.body);

    if(!result.success){
        res.status(401).json({
            message: "Not valid credentials",
            error: result.error
        })
    }

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        res.status(409).json({
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