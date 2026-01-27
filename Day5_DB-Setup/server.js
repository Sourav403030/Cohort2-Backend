const app = require("./src/app");
const mongoose = require("mongoose");
require('dotenv').config()

function connectToDb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected to Database");
    })
    .catch((error)=>{
        console.log(error);
    })
}

connectToDb();

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})