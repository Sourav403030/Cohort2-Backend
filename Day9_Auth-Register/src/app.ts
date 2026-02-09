import express from "express"
import "dotenv/config"
import { authRouter } from "./routes/authRoutes";

export const app = express();

app.use("/api/auth", authRouter);


