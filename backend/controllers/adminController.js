import validator from "validator"
import bcript from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"


/// API for adding doctor


const addDoctor=async (req, res)=>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees, address}=req.body
        const imageFile=req.file

        //// checking for all data to add doctor 
        if (!name|| !email || !password || !speciality || !degree || !experience || !about || !fees || address){
            return res.json({success:false,message:"Missing Details"})
        }
        /// validate the Email format 

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter valid Email"})
        }

        /// validateing strong passwrd

        if(password.length<8){

            return res.json({success:false,message:"Please Enter  strong password"})
    
        }

        /// hasing password 
        const slat=await bcript.genSalt(10)
        const hashedPassword=await bcript.hash(password,slat)

        /// upload image into cloudinary 
        
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true,message:"Doctor added"})


    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}


export {addDoctor}