import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 yr");
  const [fees, setFees] = useState("");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { backendUrl, token } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!docImg) {
        setIsSubmitting(false);
        return toast.error("Please select an image");
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', address);

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setFees("");
        setAbout("");
        setEmail("");
        setDegree("");
        setAddress("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#FF7F50] to-[#FFA07A]">
            <h2 className="text-2xl font-bold text-white">Add New Doctor</h2>
            <p className="text-white text-opacity-90 mt-1">Register a new medical professional</p>
          </div>

          <form onSubmit={onSubmitHandler} className="p-6">
            {/* Image Upload */}
            <div className="flex flex-col items-center mb-8">
              <label
                htmlFor="doc-img"
                className="cursor-pointer relative group transition-all duration-300"
              >
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300 group-hover:border-[#FF7F50] transition-all duration-300 shadow-md">
                  <img
                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                    alt="Doctor"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!docImg && (
                    <div className="absolute inset-0  group-hover:bg-opacity-10 flex items-center justify-center transition-all duration-300 rounded-full">
                      <svg className="w-10 h-10 text-gray-400 group-hover:text-[#FF7F50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" className="hidden" />
                <p className="mt-3 text-sm text-center text-gray-600 group-hover:text-[#FF7F50] transition-colors duration-300">
                  {docImg ? "Change photo" : "Click to upload photo"}
                </p>
              </label>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {[
                { label: "Full Name", value: name, onChange: setName, type: "text", placeholder: "Dr. John Smith" },
                { label: "Email Address", value: email, onChange: setEmail, type: "email", placeholder: "doctor@example.com" },
                { label: "Password", value: password, onChange: setPassword, type: "password", placeholder: "••••••••" },
                { 
                  label: "Experience", 
                  value: experience, 
                  onChange: setExperience, 
                  type: "select",
                  options: Array.from({ length: 10 }, (_, i) => ({
                    value: `${i + 1} yr`,
                    label: `${i + 1} ${i === 0 ? "year" : "years"}`
                  }))
                },
                { label: "Consultation Fees ($)", value: fees, onChange: setFees, type: "number", placeholder: "100" },
                { 
                  label: "Specialization", 
                  value: speciality, 
                  onChange: setSpeciality, 
                  type: "select",
                  options: [
                    { value: "General Physician", label: "General Physician" },
                    { value: "Gynecologist", label: "Gynecologist" },
                    { value: "Dermatologist", label: "Dermatologist" },
                    { value: "Pediatricians", label: "Pediatrician" },
                    { value: "Neurologist", label: "Neurologist" },
                    { value: "Gastroenterologist", label: "Gastroenterologist" }
                  ]
                },
                { label: "Education", value: degree, onChange: setDegree, type: "text", placeholder: "MD, MBBS, etc." },
                { label: "Clinic Address", value: address, onChange: setAddress, type: "text", placeholder: "123 Medical St, City" },
              ].map((field, index) => (
                <div key={index} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50] focus:border-[#FF7F50] outline-none transition-all duration-300 hover:border-[#FF7F50]"
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50] focus:border-[#FF7F50] outline-none transition-all duration-300 hover:border-[#FF7F50]"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* About Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">About Doctor</label>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                placeholder="Brief professional bio..."
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50] focus:border-[#FF7F50] outline-none transition-all duration-300 hover:border-[#FF7F50]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 
                ${isSubmitting 
                  ? 'bg-[#FFA07A] cursor-not-allowed' 
                  : 'bg-[#FF7F50] hover:bg-[#FF6347] hover:shadow-md transform hover:-translate-y-0.5'
                } focus:outline-none focus:ring-2 focus:ring-[#FF7F50] focus:ring-offset-2`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Register Doctor"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;