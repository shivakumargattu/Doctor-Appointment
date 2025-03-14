import axios from "axios";
import { useState } from "react";
import { createContext} from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const backendUrl=import.meta.env.VITE_BACKEN_URL
   
  const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):"")
   
  const [doctors,setDoctors]=useState([])
  const getAllDoctors=async ()=>{

    try {

      const {data}=await axios.post(backendUrl + "/api/admin/all-doctors",{},{headers:{token}})
      if(data.success){
        setDoctors(data.doctors)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {

      console.log(error)
      toast.error(error.message)
      
    }
  }

  const value = {
    token,setToken,backendUrl,getAllDoctors,doctors

  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;