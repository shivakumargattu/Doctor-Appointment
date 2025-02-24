import React from 'react'
import {assets} from "../assets/assets"

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg md:px-10 lg:px-20'>
   
   {/*---- left Side  ----*/}

   <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-8 m-auto md:py-[10vw] md:mb-[-30px]'>
      <p className='text-3xl md:text-3xl lg:text-4xl text-white'>Book Appointment <br className='hidden sm:block'/> With Trusted Doctors</p>
      <div className='flex flex-col lg:flex-row items-center gap-3 text-white text-sm font-semibold'>
        <img className='w-28' src={assets.group_profiles} alt='profiles'/>
        <p>Simply browse through our extensive list of trusted doctors, 
        schedule your appointment hassle-free.</p>
  
        </div>
        <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full  text-gray-600 md:m-0 hover:scale-105 transition-all duration-300'>
            Book appointment <img className='w-3' src={assets.arrow_icon} alt="arow"/>
        </a>

   </div>

   
   {/*---- right,Side  ----*/}

<div className='md:w-1/2 relative'>
 <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="Heade Images"/>
</div>

    </div>
  )
}

export default Header