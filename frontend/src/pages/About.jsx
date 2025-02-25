import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='p-3'>
     <h3 className='text-gray-900 text-center font-medium  text-3xl '>About Us</h3>
     <div className=' flex flex-row gap-4 pt-10  '>
     <div>
      <img  className="w-full " src={assets.about_image} alt="about image" />
      
     </div>
     <div className='text-gray-500 text-sm  '>
     
      <p>Welcome to Baby Step your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>

<p>Baby Step is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>

<p className='text-gray-900 font-medium text-2xl pt-10'>Our Vision</p>

<p>Our vision at Baby Step is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
      
     </div>
     </div>
     <div>
      <p className='pt-4 text-gray-900 font-medium'>Why Choose Us</p>
     </div>
    
    </div>
  )
}

export default About