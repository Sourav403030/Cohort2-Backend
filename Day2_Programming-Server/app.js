const express = require("express");

const app = express();

app.get("/", (req, res)=>{
    res.send("Default route");
})

app.get("/about", (req, res)=>{
    res.send("About route");
})

app.get("/services", (req, res)=>{
    res.send("Services route");
})

app.listen(3000, ()=>console.log("Server running on Port 3000"));