import React, { useContext, useEffect, useState } from 'react'
import { useFetcher, useNavigate, useParams } from 'react-router-dom'
import {AppContext} from "../context/AppContext"

const Doctors = () => {

  const {speciality} =useParams()
 const {doctors}=useContext(AppContext)
 const [filterDoc,setFilterDoc]=useState([])
 const navigte=useNavigate()



 const applyFilter=()=>{
  if(speciality){
    setFilterDoc(doctors.filter(doc=>doc.speciality==speciality))
  }else{
    setFilterDoc(doctors)
  }
 }

 useEffect(()=>{
  applyFilter()

 },[doctors,speciality])
  return (
    <div>
     <p className='text-gray-600 '>Browse through the doctors specialist.</p>
     <div className='flex flx-col sm:flex-row items-start gap-10 mt-5'>
     <div className='flex-col gap-4 text-sm text-gray-600  '>
           <p onClick={()=>speciality=="General physician"?navigte("/doctors"):navigte("/doctors/General physician")}  className='w-[94vw sm:w-auto pl-3  px-24 py-1.5  cursor-pointer m-1 border border-gray-300 rouneded transition-all hover:bg-primary '>General physician</p>
           <p onClick={()=>speciality=="Gynecologist"?navigte("/doctors"):navigte("/doctors/Gynecologist")} className='w-[94vw sm:w-auto pl-3 px-24  py-1.5  cursor-pointer m-1  border border-gray-300 rouneded transition-all hover:bg-primary' >Gynecologist</p>
           <p onClick={()=>speciality=="Dermatologist"?navigte("/doctors"):navigte("/doctors/Dermatologist")} className='w-[94vw sm:w-auto pl-3 px-24  py-1.5 cursor-pointer  m-1  border border-gray-300 rouneded transition-all hover:bg-primary' >Dermatologist</p>
           <p onClick={()=>speciality=="Pediatricians"?navigte("/doctors"):navigte("/doctors/Pediatricians")} className='w-[94vw sm:w-auto pl-3  px-24 py-1.5  cursor-pointer  m-1 border border-gray-300 rouneded transition-all hover:bg-primary' >Pediatricians</p>
           <p onClick={()=>speciality=="Neurologist"?navigte("/doctors"):navigte("/doctors/Neurologist")} className='w-[94vw sm:w-auto pl-3  px-24 py-1.5  cursor-pointer  m-1 border border-gray-300 rouneded transition-all hover:bg-primary' >Neurologist</p>
           <p onClick={()=>speciality=="Gastroenterologist"?navigte("/doctors"):navigte("/doctors/Gastroenterologist")} className='w-[94vw sm:w-auto pl-3  px-24 py-1.5  cursor-pointer  m-1 border border-gray-300 rouneded transition-all hover:bg-primary' >Gastroenterologist</p>
      </div>

    

<div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
  {
    filterDoc.map((item,index)=>(
                 <div onClick={()=>navigte(`/appointment/${item._id}`)} key={index} className='border border-orange-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300'>
                  
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
</div>
    </div>
  )
}

export default Doctors