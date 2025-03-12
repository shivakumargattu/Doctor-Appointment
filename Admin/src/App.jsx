import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from './context/AdminContext';
import Navbar from './componets/Navbar';
import Sidebar from './componets/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashnoard from './pages/Admin/Dashnoard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';

const App = () => {

 const {token}=useContext(AdminContext)

  return  token ?(
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path='/adimn-dashboard' element={<Dashnoard/>} />
          <Route path="all-appointments" element={AllAppointments}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
        </Routes>

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