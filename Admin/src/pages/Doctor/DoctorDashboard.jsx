import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DoctorDashboard = () => {
  const [dashdata, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data generator
  const generateMockData = () => {
    const mockAppointments = [
      {
        _id: "1",
        patientName: "John Doe",
        date: new Date(),
        isCompleted: true,
        amount: 1500
      },
      {
        _id: "2",
        patientName: "Jane Smith",
        date: new Date(Date.now() - 86400000),
        isCompleted: false,
        amount: 1200
      },
      {
        _id: "3",
        patientName: "Robert Johnson",
        date: new Date(Date.now() - 172800000),
        isCompleted: true,
        amount: 1800
      },
      {
        _id: "4",
        patientName: "Emily Davis",
        date: new Date(Date.now() - 259200000),
        isCompleted: true,
        amount: 2000
      },
      {
        _id: "5",
        patientName: "Michael Wilson",
        date: new Date(Date.now() - 345600000),
        isCompleted: false,
        amount: 1600
      }
    ];

    const completedAppointments = mockAppointments.filter(app => app.isCompleted);
    const totalEarnings = completedAppointments.reduce((sum, app) => sum + app.amount, 0);
    const uniquePatients = [...new Set(mockAppointments.map(app => app.patientName))];
    
    return {
      earnings: totalEarnings,
      appointments: mockAppointments.length,
      patients: uniquePatients,
      latestAppointments: [...mockAppointments].reverse().slice(0, 5),
      appointmentsByDay: [1, 4, 2, 5, 3, 2, 0] // Sample data for each day of week
    };
  };

  useEffect(() => {
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setDashData(generateMockData());
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading dashboard data...</div>;
  }

  if (!dashdata) {
    return <div className="text-center py-8">No data available</div>;
  }

  // Prepare data for the weekly appointments chart
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyData = dashdata.appointmentsByDay.map((count, index) => ({
    day: weekDays[index],
    appointments: count
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Earnings</h3>
          <p className="text-2xl font-bold">₹{dashdata.earnings.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Appointments</h3>
          <p className="text-2xl font-bold">{dashdata.appointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Patients</h3>
          <p className="text-2xl font-bold">{dashdata.patients.length}</p>
        </div>
      </div>

      {/* Weekly Appointments Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Appointments</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#8884d8" name="Appointments" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashdata.latestAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${appointment.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {appointment.isCompleted ? 'Completed' : 'Upcoming'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{appointment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;