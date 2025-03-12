import React from 'react';
import { assets } from '../../assets/assets';

const AddDoctor = () => {
  return (
    <div className="w-full p-2 sm:p-3">
      <form className="border-r border-amber-50 m-2 sm:m-3 w-full  "> {/* Removed max-w-md */}
        <p className="mb-2 text-lg font-semibold text-gray-800">Add Doctor</p>
        <div className="bg-white p-3 border rounded-md shadow-sm">
          <div className="mb-3 flex flex-col items-center">
            <label
              htmlFor="doc-img"
              className="cursor-pointer rounded-full overflow-hidden w-20 h-20 flex items-center justify-center bg-gray-100"
            >
              <img
                src={assets.upload_area}
                alt="Upload Doctor Picture"
                className="max-w-full max-h-full"
              />
            </label>
            <input type="file" id="doc-img" hidden />
            <p className="mt-1 text-xs text-gray-600 text-center">
              Upload picture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2">
            <div>
              <label
                htmlFor="doctor-name"
                className="block text-xs font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="doctor-name"
                placeholder="Name"
                required
                className="mt-0.5 p-2 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
              />
            </div>
            <div>
              <label
                htmlFor="doctor-email"
                className="block text-xs font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="doctor-email"
                placeholder="Email"
                required
                className="mt-0.5 p-2 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
              />
            </div>
            <div>
              <label
                htmlFor="doctor-password"
                className="block text-xs font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="doctor-password"
                placeholder="Password"
                required
                className="mt-0.5 p-2 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
              />
            </div>
            <div>
              <label
                htmlFor="doctor-experience"
                className="block text-xs font-medium text-gray-700"
              >
                Exp.
              </label>
              <select
                id="doctor-experience"
                className="mt-0.5 p-2 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Yr
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="doctor-fees"
                className="block text-xs font-medium text-gray-700"
              >
                Fees
              </label>
              <input
                type="number"
                id="doctor-fees"
                placeholder="Fees"
                required
                className="mt-0.5 p-2 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
              />
            </div>
            <div>
              <label
                htmlFor="doctor-speciality"
                className="block text-xs font-medium text-gray-700"
              >
                Spec.
              </label>
              <select
                id="doctor-speciality"
                className="mt-0.5 p-2 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="doctor-education"
                className="block text-xs font-medium text-gray-700"
              >
                Edu.
              </label>
              <input
                type="text"
                id="doctor-education"
                placeholder="Education"
                required
                className="mt-0.5 p-2 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
              />
            </div>
            <div>
              <label
                htmlFor="doctor-address"
                className="block text-xs font-medium text-gray-700"
              >
                Addr.
              </label>
              <input
                type="text"
                id="doctor-address"
                placeholder="Address"
                required
                className="mt-0.5 p-2 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="doctor-about"
              className="block text-xs font-medium text-gray-700"
            >
              About
            </label>
            <textarea
              id="doctor-about"
              placeholder="About doctor"
              rows={2}
              required
              className="mt-0.5 p-5 w-full border rounded-md text-xs focus:ring focus:ring-orange-200 focus:border-orange-300"
            ></textarea>
          </div>
          <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-3 rounded-md w-full text-xs">
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;