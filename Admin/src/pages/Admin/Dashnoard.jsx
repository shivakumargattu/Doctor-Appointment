import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { FiUsers, FiCalendar, FiUserPlus, FiClock, FiUser, FiActivity } from 'react-icons/fi';

const Dashboard = () => {
  const { doctors, appointments, token, getAllDoctors, getAllAppointments, isLoading } = useContext(AdminContext);
  const [latestAppointments, setLatestAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Load data on mount and when token changes
  useEffect(() => {
    if (token) {
      getAllDoctors();
      getAllAppointments();
    }
  }, [token]);

  // Create a doctors map for quick lookup
  const doctorsMap = useMemo(() => {
    const map = {};
    doctors.forEach(doctor => {
      map[doctor._id] = doctor;
    });
    return map;
  }, [doctors]);

  // Calculate derived data
  const { doctorCount, appointmentCount, patientCount, upcomingAppointments } = useMemo(() => {
    const uniquePatients = new Set(
      appointments.map((appointment) => appointment.userId).filter(Boolean)
    );

    const now = new Date();
    const upcoming = appointments
      .filter(appt => new Date(appt.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);

    return {
      doctorCount: doctors.length,
      appointmentCount: appointments.length,
      patientCount: uniquePatients.size,
      upcomingAppointments: upcoming
    };
  }, [doctors, appointments]);

  // Update latest appointments with doctor info
  useEffect(() => {
    if (appointments.length > 0) {
      const appointmentsWithDoctorInfo = appointments.map(appointment => {
        const doctor = doctorsMap[appointment.docId] || {};
        return {
          ...appointment,
          doctorInfo: {
            name: doctor.name || "Unknown Doctor",
            speciality: doctor.speciality || "General",
            avatar: doctor.avatar || `https://ui-avatars.com/api/?name=${doctor.name || "D"}&background=random`
          }
        };
      });

      const sorted = [...appointmentsWithDoctorInfo].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setLatestAppointments(sorted.slice(0, 5));
    } else {
      setLatestAppointments([]);
    }
  }, [appointments, doctorsMap]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm h-32"></div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FiUserPlus size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-800">{doctorCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FiUsers size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-800">{patientCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FiCalendar size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-800">{appointmentCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Appointments */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Appointments</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {latestAppointments.length > 0 ? (
                latestAppointments.map((appointment) => (
                  <div key={appointment._id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0 mr-4">
                      <img 
                        src={appointment.doctorInfo.avatar} 
                        alt={appointment.doctorInfo.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">
                          {appointment.doctorInfo.name}
                          <span className="text-sm text-gray-500 ml-2">({appointment.doctorInfo.speciality})</span>
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : appointment.status === 'cancelled' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiClock className="mr-1" size={14} />
                        <span>
                          {appointment.date && new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                          {' '}at {appointment.timeSlot}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FiActivity className="mx-auto text-gray-400" size={48} />
                  <p className="mt-2 text-gray-500">No recent appointments found</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Schedule</h2>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment._id} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <img 
                          src={appointment.doctorInfo.avatar} 
                          alt={appointment.doctorInfo.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{appointment.doctorInfo.name}</h4>
                        <p className="text-sm text-gray-600">
                          {appointment.date && new Date(appointment.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                          {' '}• {appointment.timeSlot}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiCalendar className="mx-auto text-gray-400" size={48} />
                <p className="mt-2 text-gray-500">No upcoming appointments</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-8">
              <h3 className="font-medium text-gray-700 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Available Doctors</span>
                  <span className="font-medium">{doctors.filter(d => d.available).length}/{doctorCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Today's Appointments</span>
                  <span className="font-medium">
                    {appointments.filter(a => {
                      const apptDate = new Date(a.date);
                      const today = new Date();
                      return apptDate.toDateString() === today.toDateString();
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">New Patients (7d)</span>
                  <span className="font-medium">
                    {new Set(
                      appointments
                        .filter(a => {
                          const apptDate = new Date(a.date);
                          const weekAgo = new Date();
                          weekAgo.setDate(weekAgo.getDate() - 7);
                          return apptDate >= weekAgo;
                        })
                        .map(a => a.userId)
                    ).size}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;