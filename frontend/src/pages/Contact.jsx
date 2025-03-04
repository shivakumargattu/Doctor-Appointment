import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
         <p className=' text-center text-2xl mb-10 '>Contact US</p>
      <div className='flex md:flex-cols'>

           <div>
            <img  className="h-2/3 rounded-full md:w-100" src={assets.contact_image} alt="about image" />
            
           </div>
           <div className='text-gray-500 text-sm w-1/2 '>
           <p className='text-gray-900  text-xl'>OUR OFFICE</p>
            <p>54709 Hyderabad  <br/>
            Telangana, Bhart</p>  
            <p className='mt-10'>Tell No: 8897414536</p> 
            <p className='mb-10'>E-mail:babystep@gmail.com</p>   
      
            <button className='bg-primary px-16 py-4 text-white rounded'>Make a Call</button>
           </div>
           </div>
    </div>
  )
}

export default Contact