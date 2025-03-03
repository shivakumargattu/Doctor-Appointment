import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets"
import {AppContext} from "../context/AppContext"

const Myappointmnts = () => {

  const {doctors} =useContext(AppContext)

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>{doctors.slice(0,4).map((item,index)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <div>
            <img className='w-32 bg-orange-50' src={item.image} alt="" />
          </div>
          <div className=' flex-1 text-sm text-zinc-600 '>
            <p className='text-neutral-800 font-semibold'>{item.name}</p>
            <p>{item.speciality}</p>
            <p className='text-zinc-700'>Adress:</p>
            <p className='text-xs'>{item.address.line1}</p>
            <p className='text-xs'>{item.address.line2}</p>
            <p className='text-sm mt-1'><span className=' text-sm text-netural-700 font-medium'>date& Time</span> 25, Mar, 2025 | 10:38</p>
    
          </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300  '> Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 '>Cancel Appointment</button>
            </div>
        </div>
      ))}</div>
    </div>
  )
}

export default Myappointmnts