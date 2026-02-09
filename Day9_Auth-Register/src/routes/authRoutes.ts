import express, {Request, Response} from "express"
import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import generateOtp from "../helper/otp";
import jwt from "jsonwebtoken"

export const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response)=>{
    const {username, email, password} = req.body;

    const result = User.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Not valid credentials",
            error: result.error
        })
    }

    const existingUser = await userModel.findOne({email});

    if(existingUser){
        return res.status(400).json({
            message: "User already exists"
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

    return res.status(201).json({
        message: "User created successfully",
        newUser
    })

})