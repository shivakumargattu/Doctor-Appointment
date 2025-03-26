import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from "../assets/assets"

const Sidebar = () => {
    const { token } = useContext(AdminContext)

    return (
        <div className='min-h-screen bg-white border-r border-gray-200 w-full md:w-64 transition-all duration-300'>
            {
                token && (
                    <ul className='text-gray-600 mt-5'>
                        {[
                            { to: "/admin-dashboard", icon: assets.home_icon, text: "Dashboard" },
                            { to: "/all-appointments", icon: assets.appointment_icon, text: "Appointments" },
                            { to: "/add-doctor", icon: assets.add_icon, text: "Add Doctors" },
                            { to: "/doctor-list", icon: assets.people_icon, text: "Doctors List" }
                        ].map((item, index) => (
                            <li key={index} className='hover:bg-[#FFF5F0] transition-colors duration-200'>
                                <NavLink 
                                    to={item.to} 
                                    className={({isActive}) => `
                                        flex items-center gap-3 py-3 px-4 md:px-6 
                                        cursor-pointer transition-all duration-200
                                        ${isActive ? 
                                            'bg-[#FFF5F0] border-r-4 border-[#FF7F50] text-[#FF7F50] font-medium' : 
                                            'hover:text-[#FF7F50]'
                                        }`
                                    }
                                >
                                    <img 
                                        src={item.icon} 
                                        alt="" 
                                        className={`w-5 h-5 ${item.to === "/add-doctor" ? 'opacity-80' : ''}`} 
                                    />
                                    <span className='text-sm md:text-base'>{item.text}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default Sidebar