import React from 'react';
import Header from '../components/Header';
import NotificationCon from '../components/NotificationCon';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; // Add this line

function MyNotifications() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    // Fetch events from the server
    axios.get(`http://localhost:3001/getNotifications`)
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  console.log(notifications);
  return (
    <div className='flex minbackground flex-col min-h-screen'>
      <Header />
      <div className=' mt-[6rem] pl-4 pr-4 pt-4'>
        <div className=' flex flex-col items-center'>
          {notifications.map(notification => (
            <NotificationCon
              key={notification.notificationid}
              message={notification.message}
              type={notification.type}
              sentdate={moment(notification.sentdate).format('YYYY-MM-DD HH:mm')} // Modify this line
            />
          ))}
          
        </div>
        <p className='font-bold text-gray-500 text-xl'>{notifications == "" ? "No Notifications" : ""}</p>
      </div>
    </div>
  );
}

export default MyNotifications;