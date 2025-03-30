import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEN_URL;
    const [dToken, setDtoken] = useState(localStorage.getItem("dToken") || "");
    const [appointments,setAppointments]=useState([])
    const [dashdata,setDashData]=useState(false)


    const getAppointments=async()=>{
        try {
            
         const {data}=await axios.get(backendUrl+"/api/doctor/appointments",{headers:{dToken}})
         if(data.success){
            setAppointments(data.appointments.reverse())
            console.log(data.appointments.reverse())
         }else{
            toast.error(data.message)
         }

        } catch (error) {

            console.log(error)
            toast.error(error.message)
            
        }
    }
 const completeAppointment=async(appointmentId)=>{
    try {
        
        const {data}=await axios.post(backendUrl+"/api/doctor/complete-appointment",{appointmentId},{headers:{dToken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        
        console.log(error)
        toast.error(error.message)
    }
 }

 const cancelAppointment=async(appointmentId)=>{
    try {
        
        const {data}=await axios.post(backendUrl+"/api/doctor/cancel-appointment",{appointmentId},{headers:{dToken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        
        console.log(error)
        toast.error(error.message)
    }
 }

 const getDashData=async()=>{

    try {
        
        const {data}=await axios.post(backendUrl+"/api/doctor/dashboard",{headers:{dToken}})
        if(data.success){
            setDashData(data.dashdata)
            console.log(data.dashdata)
        }else{
            toast.error(data.message)
        }
        
    } catch (error) {
        console.log(error)
        
        
    }
 }

    const value = {
        backendUrl,
        dToken,
        setDtoken,
        appointments,setAppointments,getAppointments,cancelAppointment,completeAppointment,getDashData,dashdata,setDashData
        
      
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;