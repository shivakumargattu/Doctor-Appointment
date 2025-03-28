import express from "express";
import { 
  loginDoctor,
  changeAvailability,
  appointmentsDoctor,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";


const doctorRouter = express.Router();
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments",authDoctor,appointmentsDoctor);
doctorRouter.post("/change-availability", changeAvailability);



export default doctorRouter;

