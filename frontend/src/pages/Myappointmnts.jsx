import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user appointments
  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Appointment cancelled");
        fetchAppointments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel appointment");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      
      {loading ? (
        <div className="text-center py-8">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You have no upcoming appointments
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div 
              key={appointment._id}
              className={`border rounded-lg p-4 ${
                appointment.cancelled ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Doctor Info */}
                <div className="flex items-start gap-4">
                  <img 
                    src={appointment.docData.image} 
                    alt={appointment.docData.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{appointment.docData.name}</h3>
                    <p className="text-gray-600">{appointment.docData.speciality}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Date:</span> {appointment.slotDate.replace(/_/g, '/')}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Time:</span> {appointment.slotTime.split(' ')[0]}
                    </p>
                  </div>
                </div>

                {/* Appointment Status */}
                <div className="flex-1">
                  <p className={`font-medium ${
                    appointment.cancelled ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {appointment.cancelled ? 'Cancelled' : 'Confirmed'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Booked on: {new Date(appointment.date).toLocaleString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {!appointment.cancelled && (
                    <>
                      <button className="text-primary px-4 py-2 border border-primary  rounded hover:bg-primary hover:text-white ">
                        Pay Online
                      </button>
                      <button 
                        onClick={() => cancelAppointment(appointment._id)}
                        className="px-4 py-2 border border-red-600  text-red-600 rounded hover:bg-red-700 hover:text-white"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;