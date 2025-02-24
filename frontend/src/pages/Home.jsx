import React from 'react'
import Header from '../componets/Header'
import Speciality from '../componets/Speciality'
import TopDoctors from '../componets/TopDoctors'
import Banner from '../componets/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <Speciality/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home