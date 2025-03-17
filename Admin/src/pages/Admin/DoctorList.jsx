import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const {doctors,token,getAllDoctors, changeAvailabilty }=useContext(AdminContext)
  useEffect(()=>{
   if(token){
    getAllDoctors()
   }
   

  },[token])
  return (
    <div className='m-5 max-h-[900] overflow-scroll'>
    <h1 className='text-lg font-medium'>All Doctors</h1>

    <div className='w-full flex flex-wrap gap-10 pt-5 gap-y-9'>
      {
        doctors.map((item,index)=>(
          <div className='border border-orange-200 rounded-xl w-50 overflow-hidden cursor-pointer p-' key={index}>
            <img className='bg-orange-50 group-hover:bg-orange-500 transition-all duration-200' src={item.image} alt="" />
            <p className=' text-neutral-800 text-lg px-4 font-medium'>{item.name}</p>
            <p className='text-zinc-600 text-sm px-4 '>{item.speciality}</p>
            <div className='mt-2 flex items-center gap-1 text-sm px-4 pb-4 cursor-pointer'>
              <input onChange={()=>changeAvailabilty(item._id)} type="checkbox" checked={item.available} className='cursor-pointer' />
              <p>available</p>
            </div>

          </div>
        ))
      }
    </div>

    </div>
  )
}

export default DoctorList