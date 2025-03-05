import express from "express";
import cors from "cors";
import connectDB from "./config/mongobd.js";
import connectCloudinary from "./config/cloudinary.js";

import "dotenv/config"

// app confi

const app= express();
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

// middelwares 

app.use(express.json())
app.use(cors())

// api Endpoint 

app.get("/",(req,res)=>{

    res.send("Api Woring All fine")

})
app.listen(port,()=>console.log("Serve Started", port))