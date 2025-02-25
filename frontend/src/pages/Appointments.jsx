import React, { useContext, useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointments = () => {

const {docId}=useParams()
        
        const daysOfWeek=["SUN","MON","TUE","WED","THU","FRI","SAT"]
        const {doctors,currencySymbol} =useContext(AppContext)
        const [docInfo,setDocInfo]=useState(null)
        const [docSlots, setDocSlots] = useState([])
        const [slotIndex, setSlotIndex] = useState(0)
        const [slotTime, setSlotTime] = useState('')



const fetchDocInfo=async()=>{
  
  const docInfo= await doctors.find(doc=>doc._id===docId)
  setDocInfo(docInfo)
  console.log(docInfo)

}

const getAvailableSlot=async ()=>{

 setDocSlots([])

 ///getting current date 
 let toady = new Date()

 for (let i=0; i<7;i++){
  let currentDate=new Date(toady)
  currentDate.setDate(toady.getDate()+i)

  let endtime=new Date()
  endtime.setDate(toady.getDate()+i)
  endtime.setHours(21,0,0,0)

  ///setting hours
  if(toady.getDate()===currentDate.getDate()){
    currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
    currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
  }else{
    currentDate.setHours(10)
    currentDate.setMinutes(0)
  } 

  let timeSlots=[]

  while(currentDate<endtime){

  let formatedTime=currentDate.toTimeString([],{hour:"2-digit",minute:"2-digit"})

    //add time slot

    timeSlots.push({
      datetime: new Date(currentDate),
      time:formatedTime
    })

    // increment curent time by 30 mints

    currentDate.setMinutes(currentDate.getMinutes()+30)

  }
  setDocSlots(prev=>([...prev,timeSlots]))
 }

}


useEffect(()=>{
fetchDocInfo()

},[doctors,docId])


useEffect(()=>{

  getAvailableSlot()

},[docInfo])


useEffect(()=>{
  console.log(docSlots)
},[docSlots])

  return docInfo && (
    <div>
    {/**----- Doctor Info ----- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        {/**----- Doctor name infomation  ----- */}
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0'>
       
            <p className='flex  items-center gap-2 text-2xl  font-medium text-gray-900
            mt-3 '>{docInfo.name}  <img src={assets.verified_icon} alt=" verifid" /></p>
           
        
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
        <p>{docInfo.degree} - {docInfo.speciality}</p>
        <button>{docInfo.experience}</button>
        </div>
     {/* ------- Doctor About ------- */}
      <div>
   <p className='flex items-center gap-1 text-sm font-medium text-gray-900
            mt-3 '>About <img src={assets.info_icon} alt=" info" /></p>
   <p className='text-gray-600'>{docInfo.about}</p>
   <p className='text-gray-500 text-md font-medium'>Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
      </div>
      
      </div>

      </div>

      {/** Booking slots  **/}
    </div>
  )
}

export default Appointments