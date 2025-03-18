import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-4 py-6 md:px-8 lg:px-16 xl:px-20 md:py-8">
      {/*---- Left Side ----*/}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-20 lg:py-16 xl:py-24 px-4 md:px-0">
        <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold leading-tight">
          Book Appointment <br className="hidden sm:block" /> With Trusted Doctors
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-4 text-white text-sm md:text-base">
          <img className="w-24 md:w-28" src={assets.group_profiles} alt="profiles" />
          <p className="max-w-md">
            Simply browse through our extensive list of trusted doctors, schedule your
            appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-3 bg-white px-8 py-3 rounded-full text-gray-600 hover:scale-105 transition-all duration-300"
        >
          Book appointment <img className="w-3" src={assets.arrow_icon} alt="arrow" />
        </a>
      </div>

      {/*---- Right Side ----*/}
      <div className="md:w-1/2 relative mt-6 md:mt-0 px-4 md:px-0">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="Header Images"
        />
      </div>
    </div>
  );
};

export default Header;