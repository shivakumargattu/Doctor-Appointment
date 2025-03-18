import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const Speciality = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col gap-6 py-8 text-gray-800 items-center"
    >
      <h1 className="text-3xl font-semibold">Find by Speciality</h1>
      <p className="text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors, schedule your
        appointment hassle-free.
      </p>
      <div className="flex w-full justify-center overflow-x-auto py-5 px-4 sm:px-0"> {/* Centered the content */}
        <div className="flex flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16"> {/* Increased gap for larger screens */}
          {specialityData.map((item, index) => (
            <Link
              onClick={() => window.scrollTo(0, 0)}
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-transform duration-300"
              key={index}
              to={`/doctors/${item.speciality}`}
            >
              <img className="w-20 h-20 sm:w-24 sm:h-24 mb-2 rounded-full object-cover" src={item.image} alt={item.speciality} />
              <p className="text-sm mt-1">{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Speciality;