import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from "react-router-dom"
import { FiLogOut } from 'react-icons/fi'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { token, setToken } = useContext(AdminContext)
  const {dToken,setDtoken}=useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate("/")
    token && setToken("")
    token && localStorage.removeItem("token")
    dToken && setDtoken("")
    

  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF7F50] to-[#FFA07A] bg-clip-text text-transparent">
            BabyStep
          </h1>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            token 
              ? 'bg-[#FFF5F0] text-[#FF7F50]'
              : 'bg-blue-50 text-blue-600'
          }`}>
            {token ? "Admin" : "Doctor"}
          </span>
        </div>

        {(token ||dToken) && (
          <button 
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium 
            bg-[#FF7F50] text-white hover:bg-[#FF6347] transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-[#FF7F50] focus:ring-opacity-50"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  )
}

export default Navbar