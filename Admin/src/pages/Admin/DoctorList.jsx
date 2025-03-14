import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const {doctors,token,getAllDoctors}=useContext(AdminContext)
  return (
    <div>


    </div>
  )
}

export default DoctorList