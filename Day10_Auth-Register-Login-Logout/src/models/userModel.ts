import mongoose from "mongoose";
import * as z from "zod";

interface userSchemaInterface{
    username: string
    email: string
    password: string
    isVerified: boolean
    otp: number
}

const userSchema = new mongoose.Schema<userSchemaInterface>({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    isVerified:{
        type:Boolean,
    },
    otp:{
        type: Number
    },
})

export const userModel = mongoose.model("users", userSchema);

export const User: z.ZodObject = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email()
})