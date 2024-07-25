import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import axios from 'axios';
import io from 'socket.io-client';
import NotificationCard from '../components/NotificationCard';
import { faCircleDot, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Sidebar from '../components/users/Sidebar';

const socket = io('http://localhost:3001', {
  withCredentials: true
});

function Home({ logout }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const [events, setEvents] = useState([]); // initialize an empty array to store events
  const [latestNotif, setLatestNotif] = useState('');
  const [latestMsg, setLatestMsg] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    axios.get('http://localhost:3001/getEvents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log("error in home get events");
        console.error(error);
        logout();
      });
  }, [notification]);

  useEffect(() => {
    axios.get(`http://localhost:3001/getNotifications`)
      .then(response => {
        setLatestNotif(response.data[0].message);
        console.log(response.data[0].message);
      })
      .catch(error => {
        console.error(error);
      });
  }, [notification]);

  useEffect(() => {
    // Fetch events from the server
    axios.get(`http://localhost:3001/getMessages/:id`)
      .then(response => {
        setLatestMsg(response.data[0].content);
      })
      .catch(error => {
        console.error(error);
      });

    
  }, [notification]);


  useEffect(() => {
    socket.on('eventNotification', (msg) => {
      setNotification(msg);
    });

    return () => {
      socket.off('eventNotification');
    };
  }, []);

  useEffect(() => {
    socket.on('messageNotification', (msg) => {
      setNotification(msg);
    });

    return () => {
      socket.off('messageNotification');
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setNotification(null), 8000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className='h-full flex minbackground min-h-screen flex-col'>
      <Header />

      <div className='grid grid-cols-1 mt-[6rem] gap-4 pl-4 pr-4 pt-4 homecon'>
        <div className='col-span-2 bg-yellow h-full flex flex-col'>
          {notification ? <NotificationCard content={notification} show={true} /> : <NotificationCard content={notification} show={false} />}

          {events.map(event => (
            <EventCard
              id={event.eventid}
              key={event.eventid}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              location={event.location}
              capacity={event.capacity}
              registrationdeadline={event.registrationdeadline}
              accessing={"alumni"}
            />
          ))}
        </div>

        <div className='relative col-span-1'>
          <div className='h-full flex flex-col fixed top-[7rem] right-0 w-1/3 pr-4'>

            <div className='bg-white bg-opacity-50 w-full hidden flex-col items-start p-4 mb-2 recSb'>
              <p className='text-lg font-bold'>Recent Notification</p>
              <Link to="/notifications">
                <div className='flex items-center mt-2 hover:bg-slate-300 p-2 rounded-sm cursor-pointer'>
                  <FontAwesomeIcon icon={faBell} color='red' size='xl' />
                  <p className={`text-start ml-2 ${!latestNotif? "opacity-50" : ""} `}>{latestNotif ? latestNotif : "No Notification to Show"}</p>
 
                </div>
              </Link>
              
            </div>
            <div className='bg-white bg-opacity-50 w-full hidden flex-col items-start p-4 recSb'>
              <p className='text-lg font-bold'>Recent Message Broadcast</p>
              <Link to="/messagebroadcast">
                <div className='flex items-center justify-center mt-2 hover:bg-slate-300 p-2 rounded-sm cursor-pointer'>
                  <FontAwesomeIcon icon={faMessage} color='purple' size='xl' />
                  <p className={`ml-2 text-start ${!latestMsg? "opacity-50" : ""}`}>{latestMsg? latestMsg : "No Message to Show"}</p>
                </div>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
