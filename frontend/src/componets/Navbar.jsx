import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'> 
        <h5 className='font-bold w-44 cursor-pointer text-primary text-xl bold'>Baby Step</h5>
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
        <div>
          <button className='bg-primary p-2 rounded font-medium text-white hidden md:block '>Create Account</button>
        </div>
    </div>

  )
}

export default Navbar