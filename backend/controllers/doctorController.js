import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import appointmentModel from "../models/appointment.js";

// Change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    
    // Validate docId exists
    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const docData = await doctorModel.findById(docId);
    
    // Check if doctor exists
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId, 
      { available: !docData.available },
      { new: true } // Return the updated document
    );
    
    res.status(200).json({ 
      success: true, 
      message: "Availability changed",
      available: updatedDoctor.available 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
};

// Doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    const doctor = await doctorModel.findOne({ email });
    
    if (!doctor) {
      return res.status(404).json({ 
        success: false, 
        message: "Doctor does not exist" 
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: '1d' // Token expiration
    });
    
    // Omit password from response
    const { password: _, ...doctorData } = doctor.toObject();
    
    res.status(200).json({ 
      success: true, 
      token,
      doctor: doctorData 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Login failed",
      error: error.message 
    });
  }
};

/// Get All Doctors list

const doctorList=async (req,res)=>{ 
   try {    const doctors=await doctorModel.find({}).select(['-password',"-email"])  
     res.json({success:true,doctors})  }
 catch (error) {        
  console.log(error)      
  res.json({success:false,message:error.message})  
   }}



// Get all appointments for doctor
const appointmentsDoctor=async(req,res)=>{
  
  try {
  const {docId}=req.body  
  const appointments=await appointmentModel.find({docId})
  res.json({success:true,appointments})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
    
  }


}


//API to mark as completed Appointments

const appointmentComplete=async(req,res)=>{

  try {

    const {docId,appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId===docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
      return res.json({success:true,message:"Appointment Completed"})
    }else{
      return res.json({success:false,message:"Mark Faild"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
}

///API for Appointment Cancel

const appointmentCancel=async(req,res)=>{

  try {

    const {docId,appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId===docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      return res.json({success:true,message:"Appointment Cancelled"})
    }else{
      return res.json({success:false,message:"Cancellation Failed"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
}

//Doctor Dashboard data for Doctor pannel
const doctorDashboard = async(req,res) => {
  try {
    const {docId} = req.body
    const appointments = await appointmentModel.find({docId})
    
    let earnings = 45000
    appointments.forEach((item) => {
      if(item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })

    let patients = []
    appointments.forEach((item) => {
      if(!patients.includes(item.userId)) {
        patients.push(item.userId)
      }
    })

    // Get appointments by day of week (0-6, Sunday-Saturday)
    const appointmentsByDay = [0, 0, 0, 0, 0, 0, 0]
    appointments.forEach(app => {
      const day = new Date(app.date).getDay()
      appointmentsByDay[day]++
    })

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients,
      latestAppointments: appointments.reverse().slice(0,5),
      appointmentsByDay
    }
    
    res.json({success: true, dashData})
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    })
  }
}

const doctorProfile=async (req,res)=>{
try {

  
  const {docId}=req.body
  const profileData=await doctorModel.findById(docId).select("-password")
  res.json({success:true,profileData})
  
} catch (error) {
  console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
}
}


/// API to update Doctor profile

const updateDoctorProfile=async(req,res)=>{
  try {
     const {docId, fees,address,available}=req.body
     await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
     res.json({success:true,message:"Profile Updated"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
}

export {
  loginDoctor,doctorList,
  changeAvailability,appointmentsDoctor,appointmentCancel,appointmentComplete,doctorDashboard,updateDoctorProfile,doctorProfile
 };  