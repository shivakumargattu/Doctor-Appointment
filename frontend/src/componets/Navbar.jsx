import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from "../assets/assets"

const Navbar = () => {


  const navigate=useNavigate()

  const [showMenu, setShowMenu]=useState(false)
  const [token,setToken]=useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'> 
        <h5 onClick={()=>navigate("/")} className='font-bold w-44 cursor-pointer text-primary text-xl bold'>Baby Step</h5>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to="/">
        <li className='py-1'>Home</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-4/5  m-auto' hidden/>
        </NavLink>

        <NavLink to="/doctors">
        <li className='py-1'>All Doctors</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-4/5  m-auto' hidden/>
        </NavLink>
        <NavLink to="/about">
        <li className='py-1'>About</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-4/5  m-auto' hidden/>
        </NavLink>
        <NavLink to="/contact">
        <li className='py-1'>Contact</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-4/5 m-auto'   hidden />
        </NavLink>
          
          
        </ul>
        <div className='flex items-center gap-4'>

        {
          
          token?
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img  className="w-9 rounded-full " src={assets.profile_pic} alt='profile'/>
            
            <img className='w-2.5' src={assets.dropdown_icon} alt='dropdownIcon'/>
            <div className='absolute top-0 right-0 pt-14 text-base font-medium z-20 text-gary-600 hidden group-hover:block'>            
            <div className='min-w-48 bg-stone-100 rounded text-gray-500 flex flex-col gap-4 p-4'>
              <p  onClick={()=>navigate("my-profile")} className='hover:text-black cursor-pointer'>My Profile</p>
              <p onClick={()=>navigate("my-appointments")} className='hover:text-black cursor-pointer'>My Appoinments</p>
              <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
            </div>
          </div>
          </div>

          :
          <button onClick={()=>navigate("/login")} className='bg-primary p-2 rounded  text-white hidden md:block '>Create Account</button>
        }
        </div>
    </div>

  )
}

export default Navbar