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
    <div>

      <img src={userData.image} alt=""/>

      {
        isEdit?
        <input type="text" value={userData.name}  onChange={e=>setUserdata(prev=>({...prev,name:e.target.value}))}/>
        :
        <p>{userData.name}</p>
      }
       <hr />
       <div>
        <p>Contact Infromation</p>
        <div>
          <p>Email id:</p>
          
          {
        isEdit?
        <input type="text" value={userData.email}  onChange={e=>setUserdata(prev=>({...prev,email:e.target.value}))} />
        :
        <p>{userData.email}</p>
      }
          <p>Phone:</p>
          {
        isEdit?
        <input type="text" value={userData.phone}  onChange={e=>setUserdata(prev=>({...prev,phone:e.target.value}))} />
        :
        <p>{userData.phone}</p>
      }
      <p>Address:</p>
      {
        isEdit?
        <p>
          <input onChange={(e) => setUserdata(prev => ({ ...prev, address: {...prev.address, linel: e.target.value}}))}  value={userData.address.line1} type='text'/>
          <br/>
          <input onChange={(e) => setUserdata(prev => ({ ...prev, address: {...prev.address, linel: e.target.value}}))} value={userData.address.line2} type="text"/>
        </p>
        :
        <p>
         {userData.address.line1} 
         <br/>
         {userData.address.line2}
        </p>
      }
        </div>
        <div>
        <p>Basic Infromation</p>
        <div>
          <p>Gender:</p>
          {
        isEdit?
       <select onChange={(e)=>setUserdata(prve=>({...prve,gender:e.target.value}))} value={userData.gender}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
       </select>
        :
        <p>{userData.gender}</p>
      }
      <p>Date Of Birth:</p>
      {
        isEdit?
        <input type="date" value={userData.dob}  onChange={e=>setUserdata(prev=>({...prev,dob:e.target.value}))}/>
        :
        <p>{userData.dob}</p>
      }
     
        </div>
        </div>
       </div>
    </div>
  )
}

export default Myprofile