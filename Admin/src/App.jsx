import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/AdminContext';
import Navbar from './componets/Navbar';
import Sidebar from './componets/Sidebar';

const App = () => {

 const {token}=useContext(AdminContext)

  return  token ?(
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div>
        <Sidebar/>
      </div>
    </div>
  ):(
    <>
            <Login/>
      <ToastContainer/>

    </>
  )
}

export default App