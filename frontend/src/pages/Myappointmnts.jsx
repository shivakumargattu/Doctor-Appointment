import React, { useContext, useEffect, useState } from 'react'
import {assets} from "../assets/assets"
import {AppContext} from "../context/AppContext"
import axios from 'axios'
import { toast } from 'react-toastify'

const Myappointmnts = () => {

  const {backendUrl,token} =useContext(AppContext)
  const [appointments,setAppointments]=useState([])

   const getUserAppointments=async()=>{
    try {

      const {data}=await axios.get(backendUrl+"/api/user/appointments",{headers:{token}})
        if(data.success){
          setAppointments(data.appointments.reverse())
          console.log(data.appointments)
        }

      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])

  const cancelAppointment=async(appointmentId)=>{
      try {
        
        const {data}=await axios.post(backendUrl+"/api/user/cancel-appointment",{appointmentId},{headers:{token}})
        if(data.success){
          toast.success(data.message)
          getUserAppointments()
        }else{
          toast.error(error.message)
        }

      } catch (error) {
        console.log(error)
      toast.error(error.message)
      }

  }

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>{appointments.map((item,index)=>(
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <div>
            <img className='w-32 bg-orange-50' src={item.docData.image} alt="" />
          </div>
          <div className=' flex-1 text-sm text-zinc-600 '>  
            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className='text-zinc-700'>Adress:</p>
            <p className='text-xs'>{item.docData.address}</p>
           
            <p className='text-sm mt-1'><span className=' text-sm text-netural-700 font-medium'>Date & Time:</span> {item.slotDate} || {item.slotTime.split(' GMT')[0]}</p>
    
          </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
            
             {!item.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300  '> Pay Online</button> } 
             {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 '>Cancel Appointment</button>}
             {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
            </div>
        </div>
      ))}</div>
    </div>
  )
}

export default Myappointmnts