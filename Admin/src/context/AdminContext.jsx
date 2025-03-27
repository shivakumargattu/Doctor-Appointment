import axios from "axios";
import { useState, useEffect, useMemo, useCallback } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEN_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized API calls to prevent recreation on every render
  const getAllAppointments = useCallback(async () => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { 
        headers: { token } 
      });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token, backendUrl]);

  const getAllDoctors = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`, 
        {}, 
        { headers: { token } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token, backendUrl]);

  const changeAvailabilty = useCallback(async (docId) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await getAllDoctors(); // Refresh doctors list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token, backendUrl, getAllDoctors]);

  // Load initial data when token changes
  useEffect(() => {
    if (token) {
      getAllDoctors();
      getAllAppointments();
    } else {
      setDoctors([]);
      setAppointments([]);
    }
  }, [token, getAllDoctors, getAllAppointments]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    token,
    setToken,
    backendUrl,
    doctors,
    appointments,
    isLoading,
    getAllDoctors,
    getAllAppointments,
    changeAvailabilty
  }), [
    token,
    doctors,
    appointments,
    isLoading,
    getAllDoctors,
    getAllAppointments,
    changeAvailabilty
  ]);

  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;