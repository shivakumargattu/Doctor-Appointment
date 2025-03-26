import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiEdit } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const AllAppointments = () => {
  const { token, appointments, getAllAppointments } = useContext(AdminContext);
  const [localLoading, setLocalLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Memoize status calculation
  const getAppointmentStatus = useCallback((appt) => {
    if (appt.cancelled) return 'cancelled';
    if (appt.isCompleted) return 'completed';
    if (appt.payment) return 'confirmed';
    return 'pending';
  }, []);

  // Memoize filtered appointments
  const filteredAppointments = useMemo(() => {
    if (filter === 'all') return appointments;
    return appointments.filter(appt => getAppointmentStatus(appt) === filter);
  }, [appointments, filter, getAppointmentStatus]);

  // Stable fetch function that won't recreate on every render
  const fetchAppointments = useCallback(async () => {
    try {
      setLocalLoading(true);
      await getAllAppointments();
    } catch (error) {
      toast.error(error.message || 'Failed to fetch appointments');
    } finally {
      setLocalLoading(false);
      setIsInitialLoad(false);
    }
  }, [getAllAppointments]);

  // Initial data fetch - runs only when token changes
  useEffect(() => {
    if (token && isInitialLoad) {
      fetchAppointments();
    }
  }, [token, isInitialLoad, fetchAppointments]);

  // Format date with error handling
  const formatDate = useCallback((dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return 'Invalid date';
    }
  }, []);

  // Status colors mapping
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  if (localLoading && isInitialLoad) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        <span className="mt-3 text-gray-600">Loading appointments...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">All Appointments</h2>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={localLoading}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {appointments.length === 0 
            ? 'No appointments found' 
            : 'No appointments match the current filter'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => {
                const status = getAppointmentStatus(appointment);
                return (
                  <tr key={appointment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FiUser className="text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.userData?.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FiMail className="mr-1" /> {appointment.userData?.email || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FiPhone className="mr-1" /> {appointment.userData?.phone || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {appointment.docData?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.docData?.speciality || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-gray-500" />
                        <span className="text-sm text-gray-900">
                          {formatDate(appointment.slotDate)}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <FiClock className="mr-2 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          {appointment.slotTime}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="text-orange-500 hover:text-orange-700 mr-3"
                        disabled={localLoading}
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default React.memo(AllAppointments);