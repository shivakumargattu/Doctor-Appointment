import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Myprofile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      formData.append('address', userData.address);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      image && formData.append("image",image)

      const {data} = await axios.post(backendUrl+"/api/user/update-profile", formData,{headers:{token}});

      if (data.success){
        // Profile updated successfully
        toast.success(data.message)
        await loadUserProfileData(); 
        setIsEdit(false);
        setImage(false)
      } else {
        // Handle error
        toast.error(data.message)
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(data.message)
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <div>
        {isEdit ? (
          <label htmlFor="image">
            <div>
              <img src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img src={image ? "" : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        ) : (
          <img className="w-36 rounded-md mb-3" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="font-medium text-xl text-neutral-800">{userData.name}</p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-700 py-2 font-medium">Contact Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
            <p className="font-medium">Email id:</p>
            {isEdit ? (
              <input
                className="bg-gray-50 text-xl font-medium max-w-60 mt-4"
                type="text"
                value={userData.email}
                onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
              />
            ) : (
              <p className="text-primary">{userData.email}</p>
            )}
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-50 text-xl font-medium max-w-60 mt-4"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-primary">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50 text-xl font-medium max-w-60 mt-4"
                  type="text"
                  value={userData.address}
                  onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </p>
            ) : (
              <p className="text-gray-400">{userData.address}</p>
            )}
          </div>
          <div>
            <p className="text-neutral-700 py-2 font-medium">Basic Information</p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700">
              <p className="font-medium">Gender:</p>
              {isEdit ? (
                <select onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-600">{userData.gender}</p>
              )}
              <p className="font-medium">Date Of Birth:</p>
              {isEdit ? (
                <input
                  className="bg-gray-50 text-xl font-medium max-w-60 mt-4"
                  type="date"
                  value={userData.dob}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          {isEdit ? (
            <button
              className="bg-primary text-white font-semibold px-7 py-2 rounded-xl mt-5"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-primary text-white font-semibold px-7 py-2 rounded-xl mt-5"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myprofile;