import mongoose from "mongoose"

export default function connectToDb(): void{

    if(!process.env.MONGODB_URI){
        console.log("MongoDB credentials required");
        process.exit(1);
    }
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((err)=>{
        console.log(err);
    })
}