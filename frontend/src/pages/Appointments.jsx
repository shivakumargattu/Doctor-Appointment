import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../componets/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, backendUrl, token } = useContext(AppContext);

  // State management
  const [doctor, setDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});

  // Constants
  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const WORKING_HOURS = { start: 10, end: 21 }; // 10AM to 9PM

  // Fetch doctor info
  useEffect(() => {
    const doc = doctors.find(d => d._id === docId);
    setDoctor(doc);
  }, [doctors, docId]);

  // Generate time slots for the next 7 days
  useEffect(() => {
    if (!doctor) return;

    const generateSlots = () => {
      setLoading(true);
      const today = new Date();
      const slots = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const daySlots = generateDaySlots(date, i === 0);
        slots.push(daySlots);
      }

      setAvailableSlots(slots);
      setLoading(false);
    };

    generateSlots();
  }, [doctor, bookedSlots]); // Add bookedSlots to dependencies

  // Generate slots for a single day with availability check
  const generateDaySlots = (date, isToday) => {
    const slots = [];
    const currentTime = new Date();
    const startTime = new Date(date);
    
    // Set start time
    if (isToday) {
      startTime.setHours(currentTime.getHours() + 1);
      startTime.setMinutes(0);
    } else {
      startTime.setHours(WORKING_HOURS.start);
      startTime.setMinutes(0);
    }

    // Set end time
    const endTime = new Date(date);
    endTime.setHours(WORKING_HOURS.end);
    endTime.setMinutes(0);

    // Generate date key for booked slots
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateKey = `${day}_${month}_${year}`;

    // Generate 30-minute slots
    while (startTime < endTime) {
      const timeString = startTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      // Check if slot is booked
      const isBooked = bookedSlots[dateKey]?.includes(timeString);

      slots.push({
        time: timeString,
        datetime: new Date(startTime),
        isAvailable: !isBooked
      });
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return {
      date: new Date(date),
      slots
    };
  };

  // Handle appointment booking
  const handleBooking = async () => {
    if (!token) {
      toast.warning("Please login to book an appointment");
      return navigate("/login");
    }

    if (!selectedTime) {
      toast.warning("Please select a time slot");
      return;
    }

    try {
      setLoading(true);
      const selectedDate = availableSlots[selectedDateIndex].date;
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      // Optimistically update local state
      setBookedSlots(prev => ({
        ...prev,
        [slotDate]: [...(prev[slotDate] || []), selectedTime]
      }));

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: selectedTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment booked successfully!");
        setSelectedTime('');
        navigate("/my-appointments");
      } else {
        // Rollback if failed
        setBookedSlots(prev => ({
          ...prev,
          [slotDate]: prev[slotDate].filter(t => t !== selectedTime)
        }));
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return <div className="text-center py-8">Loading doctor information...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Doctor Information */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-full md:w-64 h-64 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{doctor.name}</h1>
          <p className="text-gray-600">{doctor.speciality}</p>
          <p className="mt-2">{doctor.about}</p>
          <p className="mt-4 font-medium">
            Consultation Fee: {doctor.fees}
          </p>
        </div>
      </div>

      {/* Appointment Booking */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
        
        {/* Date Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Select Date</h3>
          <div className="flex overflow-x-auto gap-2 pb-2">
            {availableSlots.map((day, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedDateIndex(index);
                  setSelectedTime('');
                }}
                className={`min-w-[70px] py-3 rounded-lg ${
                  selectedDateIndex === index
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div>{DAYS[day.date.getDay()]}</div>
                <div>{day.date.getDate()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        {/* Time Slot Selection */}
<div className="mb-6">
  <h3 className="text-lg font-medium mb-2">Available Time Slots</h3>
  {loading ? (
    <div className="text-center py-4">Loading slots...</div>
  ) : availableSlots[selectedDateIndex]?.slots.filter(slot => slot.isAvailable).length === 0 ? (
    <div className="text-center py-4 text-gray-500">
      No available slots for this day
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {availableSlots[selectedDateIndex]?.slots
        .filter(slot => slot.isAvailable) // Only show available slots
        .map((slot, index) => (
          <button
            key={index}
            onClick={() => setSelectedTime(slot.time)}
            className={`py-2 rounded-md transition-all text-sm ${
              selectedTime === slot.time
                ? 'bg-primary text-white border-primary' // Selected slot
                : 'bg-white text-gray-800 border border-gray-300 hover:border-primary hover:text-primary' // Available slot
            }`}
          >
            {slot.time}
          </button>
        ))}
    </div>
  )}
</div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={!selectedTime || loading}
          className={`w-full py-3 rounded-lg text-white font-medium ${
            !selectedTime || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-orange-600'
          }`}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-12">
        <RelatedDoctors docId={docId} speciality={doctor.speciality} />
      </div>
    </div>
  );
};

export default Appointments;