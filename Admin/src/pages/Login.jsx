import React, { useState } from 'react'


const Login = () => {

    const [state,setState]=useState("Admin")

  return (
         <form className='min-h-[80vh] flex items-center  '>

          <div className='flex flex-col gap-3 items-start p-8 m-auto min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
            <p className='text-2xl font-semibold'><span>{state}</span> Login </p>
              <div>
                <p>Email</p>
                <input type="email"  required/>

              </div>
              <div>
                <p>Password</p>
                <input type="password"  required/>

              </div>
              <button className="bg-[#FF7F50]">Login</button>
          </div>
         </form>
  )
}

export default Login