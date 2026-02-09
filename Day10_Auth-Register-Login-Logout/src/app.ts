import express from "express";
import "dotenv/config";
import connectToDB from "./config/db";
import { authRouter } from "./routes/authRoutes";

connectToDB();

export const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);