import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

// api to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating Email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid Email" });
    }
    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter strong password with 8 char",
      });
    }

    // Check if user with the same email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User with this email already exists. Try a different email.",
      });
    }

    /// hashing password

    const salt = await bcrypt.genSalt(10);
    const hasingPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hasingPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save(); // Corrected: await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// login user  API

const loginUser=async (req,res)=>{
  try {

    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
     return res.json({ success: false,message:"User does not exist" });
    
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(isMatch){
       const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
       res.json({success:true,token})
    }else{
      res.json({ success: false,message:"Invaild credetilas" });

    }

  } catch (error) {
    
    console.log(error);
    res.json({ success: false, message: error.message });
 
  }
}

/// API for get user profile

const getProfile=async (req,res)=>{

  try {

     const {userId}=req.body
     const userData=await userModel.findById(userId).select("-password")
     res.json({success:true,userData})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
 
    
  }
}


/// API user Update profile

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, phone, address, dob, gender },
      { new: true } // Return the updated document
    );

    if (imageFile) {
      // Upload image into cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      if (imageUpload && imageUpload.secure_url) {
        await userModel.findByIdAndUpdate(userId, { image: imageUpload.secure_url });
      } else {
          return res.json({success:false, message:"Cloudinary upload failed"});
      }

    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};




export { registerUser,loginUser,getProfile,updateProfile};