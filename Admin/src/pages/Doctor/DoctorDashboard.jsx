import React from 'react'
import { FiCalendar, FiUser, FiDollarSign, FiClock } from 'react-icons/fi'

const DoctorDashboard = () => {
  // Sample data - replace with your actual data
  const stats = [
    { title: "Total Appointments", value: 124, icon: <FiCalendar className="text-xl" />, trend: "↑ 12%", color: "text-blue-500" },
    { title: "New Patients", value: 42, icon: <FiUser className="text-xl" />, trend: "↑ 5%", color: "text-green-500" },
    { title: "Earnings", value: "₹85,420", icon: <FiDollarSign className="text-xl" />, trend: "↑ 18%", color: "text-amber-500" },
    { title: "Avg. Wait Time", value: "15 min", icon: <FiClock className="text-xl" />, trend: "↓ 2%", color: "text-purple-500" }
  ]

  const recentAppointments = [
    { id: 1, patient: "Rahul Sharma", time: "10:00 AM", date: "12 May 2023", status: "completed", payment: "Online" },
    { id: 2, patient: "Priya Patel", time: "11:30 AM", date: "12 May 2023", status: "upcoming", payment: "Cash" },
    { id: 3, patient: "Amit Singh", time: "2:00 PM", date: "12 May 2023", status: "upcoming", payment: "Online" }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Doctor Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color.replace('text', 'bg')} bg-opacity-10`}>
                {stat.icon}
              </div>
            </div>
            <p className={`text-xs mt-3 ${stat.color}`}>{stat.trend} from last week</p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
          <button className="text-sm text-[#FF7F50] font-medium">View All</button>
        </div>
        
        <div className="divide-y">
          {recentAppointments.map((appointment) => (
            <div key={appointment.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="md:col-span-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <FiUser className="text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{appointment.patient}</p>
                  <p className="text-xs text-gray-500">ID: {appointment.id}</p>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <p className="text-gray-600">{appointment.date}</p>
                <p className="text-sm text-gray-500">{appointment.time}</p>
              </div>
              
              <div className="md:col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
              
              <div className="md:col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  appointment.payment === 'Online' ? 'bg-purple-100 text-purple-800' : 
                  'bg-amber-100 text-amber-800'
                }`}>
                  {appointment.payment}
                </span>
              </div>
              
              <div className="md:col-span-1 flex justify-end">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
        </div>
        
        <div className="p-6">
          <div className="relative">
            {/* Timeline */}
            <div className="border-l-2 border-gray-200 absolute h-full left-4 top-0"></div>
            
            {[9, 10, 11, 12, 1, 2, 3, 4, 5].map((hour) => (
              <div key={hour} className="mb-8 relative pl-10">
                <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7px] top-1"></div>
                <p className="text-sm font-medium text-gray-500">{hour}:00 {hour < 12 ? 'AM' : 'PM'}</p>
                
                {/* Sample appointment - replace with real data */}
                {hour === 10 && (
                  <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="font-medium text-blue-800">Rahul Sharma</p>
                    <p className="text-sm text-blue-600">General Checkup</p>
                    <p className="text-xs text-blue-500 mt-1">10:00 - 10:30 AM</p>
                  </div>
                )}
                
                {hour === 2 && (
                  <div className="mt-2 p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <p className="font-medium text-purple-800">Priya Patel</p>
                    <p className="text-sm text-purple-600">Follow-up Visit</p>
                    <p className="text-xs text-purple-500 mt-1">2:00 - 2:45 PM</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard