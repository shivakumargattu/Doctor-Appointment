import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='p-3'>
     <h3 className='text-gray-900 text-center font-medium  text-3xl '>About Us</h3>
     <div className='lg:flex flex-row pt-10 md:flex-cols justify-center items-center gap-2  '>
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
     <div > 
      <p className='pt-4 text-gray-900 text-xl font-medium'>Why Choose Us</p>

      <div className='lg:flex flex-row py-4 px-8 my-5 items-center border gap-4 border-gray-300 md: flex-cols' >
  
       <div className='p-4 flex  flex-col items-start cursor-pointer rounded  hover:bg-primary'>
        <h1 className='text-gray-900 font-medium'>Efficiency:</h1>
        <p className='text-gray-500 text-sm'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
       </div>
       <div className='p-3 flex flex-col  items-start cursor-pointer rounded  hover:bg-primary'>
         <h1 className='text-gray-900 font-medium'>Convenience:</h1>
         <p className='text-gray-500 text-sm'>Access to a network of trusted healthcare professionals in your area.</p>
       </div>
      <div className='p-3 flex  flex-col items-startcursor-pointer rounded  hover:bg-primary'>
        <h1 className='text-gray-900 font-medium'>Personalization:</h1>
        <p className='text-gray-500 text-sm'>Tailored recommendations and reminders to help you stay on top of your health.</p>
      </div>
      </div>
     </div>
    
    </div>
  )
}

export default About