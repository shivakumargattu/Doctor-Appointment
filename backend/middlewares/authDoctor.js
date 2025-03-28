import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";

const authDoctor = async (req, res, next) => {
    try {
        // Get token from headers (your original dToken format)
        const dToken = req.headers.dtoken || req.headers.dToken;
        
        if (!dToken) {
            return res.status(401).json({ 
                success: false, 
                message: "Not Authorized - Login Again" 
            });
        }

        // Verify token
        const decoded = jwt.verify(dToken, process.env.JWT_SECRET);
        
        // Check if doctor exists
        const doctor = await doctorModel.findById(decoded.id);
        if (!doctor) {
            return res.status(401).json({ 
                success: false, 
                message: "Doctor not found" 
            });
        }

        // Attach doctor ID to request body (matching your original style)
        req.body.docId = decoded.id;
        next();
        
    } catch (error) {
        console.error("Authentication error:", error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token" 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export default authDoctor;