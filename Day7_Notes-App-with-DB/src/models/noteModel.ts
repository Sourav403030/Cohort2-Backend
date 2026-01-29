import mongoose from "mongoose";

interface noteInterface{
    title: string
    description: string
}

const noteSchema = new mongoose.Schema<noteInterface>({
    title: String,
    description: String,
})

export const noteModel = mongoose.model("notes", noteSchema);