import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const backendUrl=import.meta.env.VITE_BACKEN_URL
   
  const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

  

  const value = {
    token,setToken,backendUrl

  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;