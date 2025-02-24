import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Myappointmnts from './pages/Myappointmnts'
import Myprofile from './pages/Myprofile'
import Appointments from './pages/Appointments'
import Navbar from './componets/Navbar'

const App = () => {
  return (
    <div className='mx-2 sm:mx-[10%]'>
    <Navbar/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/doctors' element={<Doctors/>}/> 
  <Route path='/doctors/:speciality' element={<Doctors/>}/>
  <Route path='/contact' element={<Contact/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/myappointments' element={<Myappointmnts/>}/>
  <Route path='/my-profile' element={<Myprofile/>}/>
  <Route path='/appointments/:docId' element={<Appointments/>}/>

  

</Routes>
     
    </div>

  )
}

export default App