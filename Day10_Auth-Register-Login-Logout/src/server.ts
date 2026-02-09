import { app } from "./app";

app.listen(process.env.PORT, ()=>{
    console.log(`Server connected to Port ${process.env.PORT}`);
})