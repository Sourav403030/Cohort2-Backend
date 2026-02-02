import mongoose from "mongoose";

interface noteSchemaInterface{
    title: string
    description: string
}

const noteSchema = new mongoose.Schema<noteSchemaInterface>({
    title: String,
    description: String,
}, {timestamps: true})

export const noteModel = mongoose.model("note", noteSchema);