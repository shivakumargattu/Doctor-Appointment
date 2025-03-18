import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const Speciality = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col gap-6 py-16 text-gray-800 items-center" // Increased gap and padding
    >
      <h1 className="text-3xl font-semibold">Find by Speciality</h1> {/* Made font bolder */}
      <p className="sm:w-2/3 md:w-1/2 lg:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors, schedule your
        appointment hassle-free.
      </p>
      <div className="flex w-full overflow-x-auto py-5 px-4 sm:px-0"> {/* Added horizontal scrolling and padding*/}
        <div className="flex flex-row gap-6 sm:gap-8 md:gap-10"> {/* Improved spacing */}
          {specialityData.map((item, index) => (
            <Link
              onClick={() => window.scrollTo(0, 0)} // Use window.scrollTo for better compatibility
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-transform duration-300" // Smoother transition
              key={index}
              to={`/doctors/${item.speciality}`}
            >
              <img className="w-20 h-20 sm:w-24 sm:h-24 mb-2 rounded-full object-cover" src={item.image} alt={item.speciality} /> {/* improved image size and style */}
              <p className="text-sm mt-1">{item.speciality}</p> {/* increased text size and added margin */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Speciality;