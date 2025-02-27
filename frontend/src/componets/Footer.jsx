import React from 'react'

const Footer = () => {
  return (
    <div className=" mt-8">
    <div className=' md:mx-1' >
    
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm '>
      {/*---Left--*/}
       <div>
       <h1 className='text-primary font-medium text-xl '>Baby Step</h1>
      <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
     
      </div>
       {/*---center--*/}
      <div className='text-gray-600'>
    <p className='text-xl text-gray-800 font-medium mb-5'>COMPANY</p>
    <ul className='flex flex-col gap-2 text-gray-600'>
    <li>Home</li>
    <li>About Us</li>
    <li>Contact us</li>
    <li>Privacy policy</li>
    </ul>
    
      </div>
       {/*---right--*/}
      <div>
  
       <h1 className='text-xl text-gray-800 font-medium mb-5'>GET IN TUCH</h1>
       <ul className='flex flex-col gap-2 text-gray-600'>
       <li>+91 8897414536</li>
       <li>gattushivamudiraju@gmail.com</li>
  
       </ul>
           </div>

</div>

<div className='text-center'>
<hr className='bg-gray-600 h-0.5 '/>
<p className='text-gray-600 text-sm  p-2'>Copyright © 2025 Gattu Shiva - All Right Reserved.</p>
</div>

    </div>
    </div>
  )
}

export default Footer