import app  from "./app";
import 'dotenv/config';
import express from "express"
import connectToDB from "./config/db";
import { Request, Response } from "express";
import { noteModel } from "./models/noteModel";

connectToDB();

app.use(express.json());


// Create Notes
app.post("/notes", async (req: Request, res: Response)=>{
    const {title, description} = req.body;
    if(!title || !description){
        res.status(400).json({
            message: "Provide the Title & Description"
        })
    }
    await noteModel.create({
        title,
        description
    })
    res.status(201).json({
        message: "Note created successfully"
    })
})

// Read Notes
app.get("/notes", async (req: Request, res: Response)=>{
    let notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})


// Update Notes
app.put("/notes/:noteId", async (req: Request, res: Response)=>{
    const {noteId} = req.params;
    if(!noteId){
        res.status(400).json({
            message: "Note ID is required"
        })
    }
    const {title, description} = req.body;
    if(!title || !description){
        res.status(400).json({
            message: "Note Title and Description is required"
        })
    }
    await noteModel.findOneAndUpdate({_id: noteId}, {title,description}, {new: true})

    res.status(200).json({
        message: "Note updated successfully",
    })
})

//Delete Notes
app.delete("/notes/:noteId", async(req: Request, res: Response)=>{
    const {noteId} = req.params;
    if(!noteId){
        res.status(400).json({
            message: "Note ID is required"
        })
    }
    await noteModel.findOneAndDelete({_id: noteId});

    res.status(204).json({
        message: "Note deleted successfully"
    })

})


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});