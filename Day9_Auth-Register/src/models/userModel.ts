import mongoose from "mongoose";
import * as z from "zod"

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
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    otp:{
        type: Number
    }
})

export const User: z.ZodObject = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string(),
})

export const userModel = mongoose.model("users", userSchema);