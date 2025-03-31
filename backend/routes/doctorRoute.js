import express from "express";
import { 
  loginDoctor,
  changeAvailability,
  appointmentsDoctor,doctorList,
  appointmentCancel,appointmentComplete,doctorDashboard,updateDoctorProfile,doctorProfile
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";


const doctorRouter = express.Router();
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/list",doctorList)
doctorRouter.get("/appointments",authDoctor,appointmentsDoctor);
doctorRouter.post("/change-availability", changeAvailability);
doctorRouter.post("/complete-appointment",authDoctor,appointmentComplete);
doctorRouter.post("/cancel-appointment",authDoctor,appointmentCancel);
doctorRouter.get("/dashboard",authDoctor,doctorDashboard);
doctorRouter.get("/doctor-profile",doctorProfile)
doctorRouter.post("/updateDoctorProfile",updateDoctorProfile)


export default doctorRouter;

