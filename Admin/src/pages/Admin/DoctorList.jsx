import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const {doctors,token,getAllDoctors}=useContext(AdminContext)
  useEffect(()=>{
   if(token){
    getAllDoctors()
   }
   

  },[token])
  return (
    <div>


    </div>
  )
}

export default DoctorList