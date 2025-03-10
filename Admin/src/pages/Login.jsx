import React, { useState } from 'react'


const Login = () => {

    const [state,setState]=useState("Admin")

  return (
         <form className='min-h-[80vh] flex items-center  '>

          <div className='flex flex-col gap-3 items-start p-8 m-auto min-w-[340px] sm:min-w-96  rounded-xl text-[#5E5E5E] text-sm shadow '>
            <p className='text-2xl font-semibold'><span className='text-[#FF7F50]'>{state==="Admin"?"Admin":"Doctor"}</span> Login </p>
              <div className='w-full'>
                <p>Email</p>
                <input className='border w-full border-[#DADADA] rounded mt-1 p-1'  type="email"  required/>

              </div>
              <div className='w-full'>
                <p>Password</p>
                <input className='border w-full border-[#DADADA] rounded mt-1 p-1' type="password"  required/>

              </div>
              <button className="bg-[#FF7F50] w-full py-2 text-white text-base rounded-lg">Login</button>
              {
                state==="Admin"?
                <p>
                  Doctor Login? <span className='text-[#FF7F50] cursor-pointer' onClick={()=>setState("Doctor")}>Click here</span>
                </p>
                :
                <p>Admin Login? <span className='text-[#FF7F50] cursor-pointer' onClick={()=>setState("Admin")}>Click here</span></p>
              }
          </div>
         </form>
  )
}

export default Login