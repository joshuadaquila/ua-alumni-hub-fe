import { faCheck, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
import io from 'socket.io-client';
import { useEffect } from 'react';
import api from '../../pages/api'

const socket = io('https://ua-alumhi-hub-be.onrender.com', {
  withCredentials: true
});

function NewEventCon({ close }) {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endtime, setEndTime]= useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [registrationdeadline, setRegistrationDeadline] = useState('');
  const [staffid, setStaffId] = useState(localStorage.getItem('adminUserId'));

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

  const addEvent = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/addEvent', {
        title,
        description,
        date,
        time,
        endtime,
        location,
        capacity,
        registrationdeadline,
        staffid
      }, { withCredentials: true });
      setLoading(false);
      sendNotification(title);
      {close()}
    } catch (error) {
      setErrors([...errors, error.response?.status || "Unknown error"]);
      setLoading(false);
    }
  };
  const sendNotification = (title) => {
    const type = "event";
    const message = `New Event: ${title}`;
  
    // Emit the notification to the socket
    socket.emit('eventNotification', message);
  
    // Send the notification to the backend to store it
    api.post('/addNotification', {
      title,
      message,
      type
    })
    .then(response => {
      console.log('Notification added successfully:', response.data);
    })
    .catch(error => {
      console.error('Error adding notification:', error);
    });
  };
  
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white w-[50%] h-[70%] p-4 rounded-lg shadow-lg">
        <div className='flex items-end justify-end'>
          <FontAwesomeIcon icon={faXmark} onClick={close} size='lg'
            className='cursor-pointer hover:scale-125' />
        </div>
        
        <form className='flex flex-col justify-start  items-center' onSubmit={addEvent}>
          <h1 className='mb-4 text-2xl font-bold'>ADD EVENT</h1>
          <div className='grid grid-cols-2 gap-4 place-content-center'>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Event Name</label>
              <input
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} required
              />
            </div>

            {/* <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Event Sub-Name</label>
              <input
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                type="text"
              />
            </div> */}

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Description</label>
              <textarea
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Date</label>
              <input
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Start Time</label>
              <input
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>End Time</label>
              <input
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                type="time"
                value={endtime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Location</label>
              <input
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Capacity</label>
              <input
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col items-start mt-2'>
              <label className='text-lg ml-2'>Registration Deadline</label>
              <input
                className="text-xl rounded-none p-2 w-80 border-b-2 border-gray-900 outline-none"
                type="date"
                value={registrationdeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                required
              />
            </div>

          </div>
          <button className='bg-slate-900 text-white w-32 h-20 flex justify-center items-center p-4 m-2 rounded-md'>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <FontAwesomeIcon icon={faCheck} className='mr-2' type='submit' />
                <p>Confirm</p>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default NewEventCon;