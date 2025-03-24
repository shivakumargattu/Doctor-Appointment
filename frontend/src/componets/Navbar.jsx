import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from "../assets/assets"
import { AppContext } from '../context/AppContext'

const Navbar = () => {

const {token,setToken,userData} =useContext(AppContext)
  const navigate=useNavigate()

  const [showMenu, setShowMenu]=useState(false)

  const logout=()=>{
    setToken("")
    localStorage.removeItem("token")
  }
  

  useEffect(()=>{

    if(token){
      navigate("/")
    }
  },[token])

  return  (
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
          
          token && userData?
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img  className="w-10 rounded-full " src={userData.image} alt='profile'/>
            
            <img className='w-2.5' src={assets.dropdown_icon} alt='dropdownIcon'/>
            <div className='absolute top-0 right-0 pt-14 text-base font-medium z-20 text-gary-600 hidden group-hover:block'>            
            <div className='min-w-48 bg-stone-100 rounded text-gray-500 flex flex-col gap-4 p-4'>
              <p  onClick={()=>navigate("my-profile")} className='hover:text-black cursor-pointer'>My Profile</p>
              <p onClick={()=>navigate("my-appointments")} className='hover:text-black cursor-pointer'>My Appoinments</p>
              <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
            </div>
          </div>
          </div>

          :
          <button onClick={()=>navigate("/login")} className='bg-primary p-2 rounded  text-white hidden md:block '>Create Account</button>
        }
       <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden ' src={assets.menu_icon} alt="" />
             {/**-------  mobile-------**/}

             <div className={`${showMenu? "fixed w-full":"h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
              <div className='flex items-center justify-between py-4 px-5'>
                <p className='font-medium text-primary text-2xl w-36'>Baby Step</p>
                <img  onClick={()=>setShowMenu(false)} className='h-8 w-34' src={assets.cross_icon} alt="" />
              </div>
              <ul className='flex flex-col font-semibold items-center to="/"'>
                <NavLink  onClick={()=>setShowMenu(false)} to="/"><p className=" px-4 py-2 rounded">Home</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to="/doctors"><p className=" px-4 py-2 rounded">All Doctors</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to="/about"><p className=" px-4 py-2 rounded">About</p></NavLink>
                <NavLink  onClick={()=>setShowMenu(false)} to="/contact"><p className=" px-4 py-2 rounded">Contact</p></NavLink>
              </ul>
             </div>
     
        </div>
    </div>

  )
}

export default Navbar