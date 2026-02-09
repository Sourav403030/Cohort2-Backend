import express from "express";
import "dotenv/config";
import connectToDB from "./config/db";
import { authRouter } from "./routes/authRoutes";
import cookieParser from "cookie-parser"

connectToDB();

export const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);