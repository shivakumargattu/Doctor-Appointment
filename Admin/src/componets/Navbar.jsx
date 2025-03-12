import React, { useContext } from 'react'

import { AdminContext } from '../context/AdminContext'
import {useNavigate} from "react-router-dom"


const Navbar = () => {
 
    const {token,setToken}=useContext(AdminContext)
    const navigate=useNavigate()
    const logout=()=>{
        navigate("/")
        token && setToken("")
        token && localStorage.removeItem("token")
    }

  return (
    <div className=' flex justify-between items-center sm:px-10 border-b bg-white' >
        <div className='flex item-center gap-2 '>
            <p className='text-orange-500  text-2xl font-medium mt-2'>Baby Step</p>
            <p className='border py-2 px-6 m-2 rounded-full border-gray-500 text-gray-700 text-xs '>{token?"Admin":"Doctor"}</p>
        </div>
        <button onClick={logout} className='bg-orange-500 text-white px-6 py-1 rounded-lg'>Logout</button>
    </div>
  )
}

export default Navbar