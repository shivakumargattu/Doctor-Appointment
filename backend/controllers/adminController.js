import validator from "validator"
import bcrypt from "bcryptjs"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointment.js"


/// API for adding doctor


const addDoctor=async (req, res)=>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees, address}=req.body
        const imageFile=req.file

        //// checking for all data to add doctor 
        if (!name|| !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
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
        const slat=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,slat)

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
            address,
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true,message:"Doctor added successfully"})


    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

/// API for login Admin

const loginAdmin=async (req,res)=>{
    try {
        
        const {email,password}=req.body

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){

            const token= jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})

        }else{
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


/// API to get all Doctors list for Admin Panel

const allDoctors=async (req,res)=>{
 try {
    
    const doctors=await doctorModel.find({}).select("-password")

    res.json({success:true,doctors})

 } catch (error) {

    console.log(error)

    res.json({success:false,message:error.message})
    
 }
}


/// API to get All Appointments list

const appointmentsAdmin = async (req, res) => {  // Add req, res parameters
    try {
        const appointments = await appointmentModel.find({})
            .populate('docId', 'name speciality')
            .sort({ date: -1, timeSlot: 1 });
            
        
        res.json({ success: true, appointments });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin}