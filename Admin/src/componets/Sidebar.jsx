import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import {assets} from "../assets/assets"

const Sidebar = () => {

    const {token}=useContext(AdminContext)

  return (
    <div className='min-h-[100vh] bg-white border-r border-amber-50'>
        {
            token && <ul className='text-[#515151] mt-5'>
                <NavLink to={"/adimn-dashboard"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?"bg-[#fff6f2]  border-r-4 border-orange-500":""}`}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink to={"all-appointments"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?"bg-[#fff6f2]  border-r-4 border-orange-500":""}`}>
                    <img src={assets.appointment_icon} alt="" />
                    <p>Appointments</p>
                </NavLink>

                <NavLink to={"/add-doctor"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?"bg-[#fff6f2]  border-r-4 border-orange-500":""}`}>
                    <img src={assets.add_icon} alt="" />
                    <p>Add Doctos</p>
                </NavLink>
                <NavLink to={"/doctor-list"} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?"bg-[#fff6f2]  border-r-4 border-orange-500":""}`}>
                    <img src={assets.people_icon} alt="" />
                    <p>Doctors List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar