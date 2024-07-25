import React from 'react'
import ualogo from "../resources/ualogo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faBroadcastTower, faHome, faMessage, faPerson, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import profilepictemp from "../resources/profilepictemp.jpg";
import { useState } from 'react';
import NotificationDot from './NotificationDot';
import io from 'socket.io-client';
import { useEffect } from 'react';
import LogoutCon from './LogoutCon';
import UserSidebar from './UserSidebar';

const socket = io('http://localhost:3001', {
  withCredentials: true
});



function Header() {
  const [showSb, setShowSb] = useState(false);
  const [uName, setUName] = useState(localStorage.getItem('uName'));

  const [notification, setNotification] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);

  const [showLogout, setShowLogout] = useState(false);

  console.log(uName);
  useEffect(() => {
    // Set up Socket.io event listener
    socket.on('eventNotification', (msg) => {
      setNotification(msg);
    });

    // Clean up Socket.io event listeners on component unmount
    return () => {
      socket.off('eventNotification');
    };
  }, [socket]);

  useEffect(() => {
    // Set up Socket.io event listener
    socket.on('messageNotification', (msg) => {
      setNotificationMsg(msg);
    });

    // Clean up Socket.io event listeners on component unmount
    return () => {
      socket.off('messageNotification');
    };
  }, [socket])

  const profilepic = () => {
    setShowLogout(!showLogout);
  }

  const showSidebar = () => {
    setShowSb(!showSb);
  }
  return (
    <div className=' w-full fixed outline-2 outline bg-white outline-slate-800
     grid shadow-md grid-cols-4 h-[6rem] header place-content-center z-50'>
      {showSb && <UserSidebar show={showSb} closeSb={showSidebar}/>}
      <div className='items-start  hidden titlealum'>
        <p className='font-bold text-lg'>UA Alumni Hub</p>
        
      </div>
      <div className='text-left ml-4 headtitle '>
        <Link to="/home" >
          <div className='flex flex-col justify-center items-center'>
            <img src={ualogo} className='rounded-full w-14 headericon ualogo hidden' />
            <h1 className='font-bold text-lg headicon hidden'>Alumni Engagement Hub</h1>
          </div>
        </Link>
        
      </div>

      <div className='headergrid col-span-2 grid grid-cols-5 gap-2'>

      <div className='userSb hidden bg-opacity-50 homebtn p-2 flex-col justify-center items-center
          rounded-md  cursor-pointer'>
          <Link to="" onClick={showSidebar}>
            
            <FontAwesomeIcon size='xl'  icon={faBars} className='headericon'/>
            <p className='text-lg hidden headicon'>Profile</p>
          </Link>
        </div>

      <div className='bg-opacity-50 homebtn p-2 flex flex-col justify-center items-center rounded-md max-h-svh cursor-pointer'>
          <Link to="/home">
            <FontAwesomeIcon size='xl' icon={faHome} className='headericon' />
            <p className='text-lg hidden headicon'>Home</p>
          </Link>
        </div>

        <div className='bg-opacity-50 homebtn p-2 flex flex-col justify-center items-center rounded-md max-h-svh cursor-pointer'>
          <Link to="/events">
            <FontAwesomeIcon size='xl' icon={faCalendarAlt} className='headericon'/>
            <p className='text-lg hidden headicon'>Events</p>
          </Link>
        </div>

        <div className=' bg-opacity-50 homebtn p-2 flex flex-col justify-center items-center
          rounded-md max-h-svh cursor-pointer'>
          <Link to="/notifications" className='flex flex-col justify-center items-center'>
            <div className='relative  w-fit '>
              {notification? <NotificationDot show={true} /> : <NotificationDot show={false} />}
              <FontAwesomeIcon size='xl'  icon={faBell} className='headericon'/>
            </div>
            <p className='text-lg hidden headicon'>Notifications</p>
          </Link>
        </div>

        <div className=' bg-opacity-50 homebtn p-2 flex flex-col justify-center items-center
          rounded-md max-h-svh cursor-pointer'>
          <Link to="/messagebroadcast" className='flex flex-col justify-center items-center'>
            <div className='relative  w-fit '>
              {notificationMsg ? <NotificationDot show={true} /> : <NotificationDot show={false} />}
              <FontAwesomeIcon size='xl'  icon={faMessage} className='headericon'/>
            </div>
            <p className='text-lg hidden headicon'>Message Broadcast</p>
          </Link>
        </div>

        <div className=' bg-opacity-50 homebtn p-2 flex flex-col justify-center items-center
          rounded-md max-h-svh cursor-pointer'>
          <Link to="/myprofile">
            <FontAwesomeIcon size='xl'  icon={faUserAlt} className='headericon'/>
            <p className='text-lg hidden headicon'>Profile</p>
          </Link>
        </div>

        



      </div>

      <div className='profhead justify-center items-center hidden'>
        <h1>{uName}</h1>
        <div className='w-14 h-14 ml-2 border-black rounded-full p-1 cursor-pointer'>
          <img src={profilepictemp} className='rounded-full w-full' onClick={profilepic} />
        </div>
        
        {showLogout ? <LogoutCon /> : ""}

      </div>

    </div>
  )
}

export default Header