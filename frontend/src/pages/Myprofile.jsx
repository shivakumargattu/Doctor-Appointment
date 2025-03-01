import React, { useState } from 'react'
import {assets} from "../assets/assets"

const Myprofile = () => {

   const [userData,setUserdata]=useState({

    name:"Shiva",
    image:assets.profile_pic,
    email:"Shiva@gmail.com",
    phone:"8897414536",
    address:{
      line1:"Hyderabad",
      line2:"Telangana",
    },
    gender:"Male",
    dob:"2000-03-06"

   })

   const [isEdit,setIsEdit]=useState(true)

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm '>
<div>
      <img className='w-36 rounded-md' src={userData.image} alt=""/>

      {
        isEdit?
        <input className="bg-gray-50 text-xl font-medium max-w-60 mt-4" type="text" value={userData.name}  onChange={e=>setUserdata(prev=>({...prev,name:e.target.value}))}/>
        :
        <p className='font-medium text-xl text-neutral-800'>{userData.name}</p>
      }
       <hr className='bg-zinc-400 h-[1px] border-none' />
       <div>
        <p className='text-neutral-500'>Contact Infromation</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          
          {
        isEdit?
        <input className="bg-gray-50 text-xl font-medium max-w-60 mt-4" type="text" value={userData.email}  onChange={e=>setUserdata(prev=>({...prev,email:e.target.value}))} />
        :
        <p className='text-primary'>{userData.email}</p>
      }
          <p className='font-medium'>Phone:</p>
          {
        isEdit?
        <input className="bg-gray-50 text-xl font-medium max-w-60 mt-4" type="text" value={userData.phone}  onChange={e=>setUserdata(prev=>({...prev,phone:e.target.value}))} />
        :
        <p className='text-primary'>{userData.phone}</p>
      }
      <p className='font-medium'>Address:</p>
      {
        isEdit?
        <p>
          <input className="bg-gray-50 text-xl font-medium max-w-60 mt-4" onChange={(e) => setUserdata(prev => ({ ...prev, address: {...prev.address, linel: e.target.value}}))}  value={userData.address.line1} type='text'/>
          <br/>
          <input className="bg-gray-50 text-xl font-medium max-w-60 mt-4" onChange={(e) => setUserdata(prev => ({ ...prev, address: {...prev.address, linel: e.target.value}}))} value={userData.address.line2} type="text"/>
        </p>
        :
        <p className='text-gray-400'>
         {userData.address.line1} 
         <br/>
         {userData.address.line2}
        </p>
      }
        </div>
        <div>
        <p className='font-medium'>Basic Infromation</p>
        <div>
          <p className='font-medium'>Gender:</p>
          {
        isEdit?
       <select onChange={(e)=>setUserdata(prve=>({...prve,gender:e.target.value}))} value={userData.gender}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
       </select>
        :
        <p className='text-primary'>{userData.gender}</p>
      }
      <p className='font-medium'>Date Of Birth:</p>
      {
        isEdit?
        <input className="bg-gray-50 text-xl font-medium max-w-60 mt-4" type="date" value={userData.dob}  onChange={e=>setUserdata(prev=>({...prev,dob:e.target.value}))}/>
        :
        <p className='text-primary'>{userData.dob}</p>
      }
     
        </div>

        </div>
       </div>
       <div>
        {
          isEdit?
          <button className='bg-primary text-white font-semibold px-7 py-2 rounded-xl mt-5' onClick={()=>setIsEdit(false)}>
            Save Infromation
          </button>
          :
          <button  className='bg-primary text-white font-semibold px-7 py-2 rounded-xl mt-5' onClick={()=>setIsEdit(true)}>Edit</button>

        }
       </div>
       </div>
    </div>
  )
}

export default Myprofile