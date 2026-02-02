import { app } from "./app";
import "dotenv/config"
import connectToDb from "./config/db";
import { Request, Response } from "express";
import { noteModel } from "./models/noteModel";


connectToDb();

interface notesBodyInterface{
    title: string
    description: string 
}

app.post("/notes", (req: Request, res: Response)=>{
    let {title, description}: notesBodyInterface = req.body;
    let note = noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "Note created successfully",
    })
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})