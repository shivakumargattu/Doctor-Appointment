import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../models/userModel"

// api to register user

const registerUser=async(req,res)=>{
    try {
        
        const {name,email,password}=req.body

          if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
          }
        
          // vaildating Email
          if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid Email"})

          }
          // vaildating strong password
          if(password.length<8){

            return res.json({success:false,message:"Enter strong password with 8 char"})

          }


          /// hasing password

          const salt=await bcrypt.genSalt(10)
          const hasingPassword=await bcrypt.hash(password,salt)

          const userData={
            name,email,password:hasingPassword
          }

          const newUser=new userModel(userData)
          const user=await newUser.save
        
          const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
          res.json({success:true , token})


    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
  
        
    }
}

export {registerUser}