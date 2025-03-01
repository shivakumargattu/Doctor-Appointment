import React, { useState } from 'react'
import {assets} from "../assets/assets"

const Myappointmnts = () => {

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

  return (
    <div>Myappointmnts</div>
  )
}

export default Myappointmnts