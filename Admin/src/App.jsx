import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './componets/Navbar'
import Sidebar from './componets/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashnoard from './pages/Admin/Dashnoard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorApointments from './pages/Doctor/DoctorApointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { token } = useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)

  return token || dToken ? (
    <div className="min-h-screen bg-[hsl(240,33%,99%)] flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300">
          <Routes>
          {/* Admin routes */}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashnoard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />

            {/* Doctor Routes*/}
            <Route path="/DoctorDashboard" element={<DoctorDashboard/>}/>
            <Route path="/doctor-appointments" element={<DoctorApointments/>}/>
            <Route path="/doctor-profile" element={<DoctorProfile/>}/>
          

            
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-white ">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Login />
    </div>
  )
}

export default App