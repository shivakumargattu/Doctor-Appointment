import React, { useState, useTransition } from 'react'

const Login = () => {

  const [state,setState]=useState("Sign Up")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")

const onSubmitHandler=async(e)=>{
  e.preventDefault()
}

  return (
   <form className='min-h[80vh]  flex items-center'  >

   <div className=' flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg'>
    <p className='text-2xl font-semibold '>{state==='Sign Up'?"Create Account":"Login" } </p>
    <p>Please {state==="Sign Up"?"sign up":"login "} to book appointment</p>
    <div className='w-full'>
      <p>Full Name</p>
      <input className='border border-zinc-200 mt-1 p-1 '  type="text" onChange={(e)=>setName(e.target.value)} value={name}  required />
    </div>
    <div className='w-full'>
      <p>Email</p>
      <input className='border border-zinc-200 mt-1 p-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required  />
    </div>
    <div className='w-full'>
      <p>Password</p>
      <input className='border border-zinc-200 mt-1 p-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required  />
    </div>
    <button className='bg-primary px-3 py-2 text-white rounded-md text-base'>{state==='Sign Up'?"Create Account":"Login" }</button>
   </div>
     


   </form>
  )
}

export default Login