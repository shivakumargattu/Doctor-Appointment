import express from "express";
import cors from "cors";
import connectDB from "./config/mongobd.js";
import connectCloudinary from "./config/cloudinary.js";

import "dotenv/config"
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app confi

const app= express();
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

// middelwares 

app.use(express.json())
app.use(cors())

// api Endpoint 
app.use("/api/admin",adminRouter)
app.use("/api/doctor",doctorRouter)
app.use("/api/user",userRouter)



app.get("/",(req,res)=>{

    res.send("Api Woring All fine")

})
app.listen(port,()=>console.log("Serve Started", port))