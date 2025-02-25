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

      {/* Booking slots */}
<div className='sm: m1-72 sm: pl-4 mt-4 font-medium text-gray-700'>
<p>Booking slots</p>
<div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
{
docSlots.length && docSlots.map((item, index)=>(
<div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?"bg-primary text-white":"border border-gray-200"}`}  key={index}>
<p>{item[0] && daysOfWeek [item[0].datetime.getDay ()]}</p>
<p>{item[0] && item[0].datetime.getDate()}</p>
</div>
))
}
</div>
</div>
<div className='flex items-center gap-3 w-full overflow-scroll mt-4'>
  {docSlots.length && docSlots[slotIndex].map((item,index)=>{

    let timePart = item.time.split(' ')[0]; 
    timePart = timePart.substring(0, 5);     


    return(
      
      
      <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime? "bg-primary": "border text-gray-400 border-gray-300"} `} key={index}>
        {timePart.toLowerCase()}
      </p>
      
    )
  }

  )}
</div>
<button className='bg-primary text-white font-light text-sm py-4 px-8 my-6 rounded-full'>Book an Appointment</button>
    </div>
  )
}

export default Appointments