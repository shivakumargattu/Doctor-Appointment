import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Banner = () => {

 const navigate=useNavigate()

  return (
    <div className='flex bg-primary my-10  rounded-lg px-6 sm:px-14 lg:px-12 md:mx-1   '>
   
     {/*-----left side -----*/}
       <div className="flex-1  py-8 md:py-16  lg:py-24 lg:pl-5">
       <div className=' text-white text-xl sm:text-2xl  md:text-3xl lg:text-4xl font-semibold'>
        <p>Book Appointment</p>
        <p className='mt-4'>With 100+ Trusted doctors</p>
        </div>
        <button onClick={()=>{navigate("/login"); scrollTo(0,0)}} className='bg-white text-sm text-gray-500 py-2 px-8 rounded-full mt-6 hover:scale-105 transition-all duration-300 '>Create Acount</button>

       </div>
     {/*-----right side -----*/}
        
       <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full absolute bottom-0' src={assets.appointment_img} alt=''/>
       </div>

    </div>
  )
}

export default Banner