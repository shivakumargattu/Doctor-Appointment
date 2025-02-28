import React, { useState } from 'react'
import {assets} from "../assets/assets"

const Myprofile = () => {

   const [userData,setUserdata]=useState({

    name:"Shiva",
    image:assets.profile_pic,
    email:"Shiva@gmail.com",
    phone:"8897414536",
    address:{
      line1:"Hyder",
      line2:"Telangana",
    },
    gender:"Male",
    dob:"2000-03-06"

   })

   const [isEdit,setIsEdit]=useState(false)

  return (
    <div>

      <img src={userData.image} alt=""/>

      {
        isEdit?
        <input type="text" value={userData.name}  onChange={e=>setUserdata(prev=>({...prev,name:e.target.value}))}/>
        :
        <p>{userData.name}</p>
      }
    </div>
  )
}

export default Myprofile