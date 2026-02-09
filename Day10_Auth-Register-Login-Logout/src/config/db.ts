import mongoose from "mongoose"

export default function connectToDB(){
    const MONGODB_URI = process.env.MONGODB_URI;

    if(!MONGODB_URI){
        console.log("MongoDB credentials required");
        process.exit(1);
    }

    mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((err)=>{
        console.error(err);
    })
}