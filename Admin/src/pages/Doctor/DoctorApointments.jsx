import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorAppointments = () => {
  const { 
    backendUrl,
    dToken,
    setDtoken,
    appointments,
    setAppointments,
    getAppointments,cancelAppointment,completeAppointment
  } = useContext(DoctorContext)

  useEffect(() => {
    if(dToken){
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Appointments</h1>
        <p className="text-sm text-gray-500">{appointments.length} total</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#FF7F50] bg-opacity-5 text-white font-medium border-b">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Payment</div>
          <div className="col-span-2">Date & Time</div>
          <div className="col-span-2">Fee</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        
        {/* Appointments List */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div 
              key={index}
              className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 px-4 md:px-6 py-4 border-b hover:bg-[#FF7F50] hover:bg-opacity-3 transition-colors"
            >
              {/* Index */}
              <div className="col-span-1 flex items-center">
                <span className="md:hidden mr-2 text-[#FF7F50] font-medium">#</span>
                <span className="text-gray-600">{index + 1}</span>
              </div>
              
              {/* Patient */}
              <div className="col-span-5 md:col-span-3 flex items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={item.userData.image} 
                      alt={item.userData.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.userData.name}</p>
                    <p className="text-xs text-gray-500">ID: {item._id.slice(-6)}</p>
                  </div>
                </div>
              </div>
              
              {/* Payment */}
              <div className="col-span-3 md:col-span-2 flex items-center">
                <span className="md:hidden mr-2 text-[#FF7F50] font-medium">Payment</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.payment ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {item.payment ? "Online" : "Cash"}
                </span>
              </div>
              
              {/* Date & Time */}
              <div className="col-span-3 md:col-span-2">
                <span className="md:hidden mr-2 text-[#FF7F50] font-medium">When</span>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{item.slotDate}</span>
                  <span className="text-xs text-gray-500">{item.slotTime}</span>
                </div>
              </div>
              
              {/* Fee */}
              <div className="col-span-3 md:col-span-2">
                <span className="md:hidden mr-2 text-[#FF7F50] font-medium">Fee</span>
                <span className="font-medium text-gray-800">₹{item.docData.fees}</span>
              </div>
              
              {/* Actions */}

              {
                item.cancelled?<p className='text-red-500'>Cancelled</p>:item.isCompleted?<p className='text-green-500'>Completed</p>
                :
                <div className="col-span-3 md:col-span-2 flex justify-end items-center gap-2">
                <button onClick={()=>cancelAppointment(item._id)} className="p-2 rounded-lg hover:bg-amber-50 text-amber-500 hover:text-amber-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button onClick={()=>completeAppointment(item._id)}  className="p-2 rounded-lg hover:bg-green-50 text-green-500 hover:text-green-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              }
              
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No appointments yet</h3>
            <p className="text-gray-500">When you have appointments, they'll appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorAppointments