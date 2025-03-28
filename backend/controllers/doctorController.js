import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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

export {
  loginDoctor,
  changeAvailability,appointmentsDoctor
 };  