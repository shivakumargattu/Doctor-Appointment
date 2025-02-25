import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from "../context/AppContext"
import { useNavigate } from 'react-router-dom'



const RelatedDoctors = ({speciality, docId}) => {
        const {doctors}=useContext(AppContext)
        const [relDoc, setRelDocs] = useState([])
         const navigte=useNavigate()
         console.log(doctors.length + speciality)

        useEffect (() =>{
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id!==docId)
            setRelDocs(doctorsData)

        }}, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {
                relDoc.slice(0,5).map((item,index)=>(
                 <div onClick={()=>{navigte(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border border-orange-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300'>
                  
                   <img className='bg-orange-50' src={item.image} alt=''/>
                   <div className='p-4'>
                   <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                   <p className='w-2 h-2 rounded-full bg-green-500'></p><p>Available</p>
                   </div>
                   <p className='text-gray-900 text-md font-medium '>{item.name}</p>
                   <p className='text-gray-700 text-sm'>{item.speciality}</p>
                   </div>
                      
                 </div>

                ))
                
                }
        </div>
        <button onClick={()=>{navigte("/doctors"); scrollTo(0,0)}} className='bg-primary px-6 py-2 m-3 text-white font-medium rounded'>More</button>
    </div>       

    )}
export default RelatedDoctors