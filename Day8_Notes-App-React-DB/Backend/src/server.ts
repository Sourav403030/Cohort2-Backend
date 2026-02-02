import { app } from "./app";
import "dotenv/config"
import connectToDb from "./config/db";
import { Request, Response } from "express";
import { noteModel } from "./models/noteModel";
import express from "express"
import cors from "cors"

connectToDb();
app.use(express.json());
app.use(cors());

interface notesBodyInterface{
    title: string
    description: string 
}

app.post("/api/notes", async (req: Request, res: Response)=>{
    const {title, description}: notesBodyInterface = req.body;
    let note = await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "Note created successfully",
    })
})

app.get("/api/notes", async (req: Request, res: Response)=>{
    let notes = await noteModel.find();
    res.status(200).json({
        notes
    })
})

app.patch("/api/notes/:id", async (req: Request, res: Response)=>{
    const {id} = req.params
    const {title, description} : notesBodyInterface = req.body;

    await noteModel.findByIdAndUpdate(id, {title, description});

    res.status(200).json({
        message: "Note updated successfully"
    })
})

app.delete("/api/notes/:id", async(req: Request, res: Response)=>{
    const {id} = req.params;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})