import express from "express";
import "dotenv/config";
import connectToDB from "./config/db";

connectToDB();

export const app = express();