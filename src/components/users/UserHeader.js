import React, { useState } from 'react';
import ualogo from "../../resources/ualogo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCalendarAlt, faCalendarDay, faCalendarCheck, faChartLine, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

function UserHeader({ page, getEvents }) {
  const [uName, setUName] = useState(localStorage.getItem('adminUName') || 'User');
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('adminUName');
    localStorage.removeItem('adminToken');
    // Optionally navigate to login page
    navigate('/');
  };

  return (
    <div className='fixed outline-slate-800 top-0 min-w-full grid grid-cols-3 h-[6rem] place-items-center place-content-center z-40 backdrop-blur-lg'>
      <div className={` ${page === "event" ? "grid" : "hidden"} col-span-2 grid-cols-5 gap-8 rounded-full`}>
        <div className='bg-opacity-50 homebtn flex flex-row justify-center items-center rounded-md max-h-svh cursor-pointer shadow-md p-2' onClick={() => getEvents("all")}>
          <FontAwesomeIcon size='xl' icon={faCalendar} />
          <p className='text-lg ml-2'>All</p>
        </div>
        <div className='bg-opacity-50 homebtn flex flex-row justify-center items-center rounded-md max-h-svh cursor-pointer shadow-md p-2' onClick={() => getEvents("future")}>
          <FontAwesomeIcon size='xl' icon={faCalendarAlt} />
          <p className='text-lg ml-2'>Upcoming</p>
        </div>
        <div className='bg-opacity-50 homebtn flex flex-row justify-center items-center rounded-md max-h-svh cursor-pointer shadow-md p-2' onClick={() => getEvents("happening")}>
          <FontAwesomeIcon size='xl' icon={faCalendarDay} />
          <p className='text-lg ml-2'>Present</p>
        </div>
        <div className='bg-opacity-50 homebtn flex flex-row justify-center items-center rounded-md max-h-svh cursor-pointer shadow-md p-2' onClick={() => getEvents("past")}>
          <FontAwesomeIcon size='xl' icon={faCalendarCheck} />
          <p className='text-lg ml-2'>Past</p>
        </div>
      </div>

      <div className={`flex relative items-center ${page === "event" ? "" : "col-start-3"}`}>
        <div className='flex items-center cursor-pointer' onClick={() => setShowLogoutMenu(!showLogoutMenu)}>
          <img src={ualogo} alt="Profile" className='w-12 h-12 rounded-full border border-gray-300 mr-3' />
          <h1>{uName}</h1>
        </div>

        {showLogoutMenu && (
          <div className='absolute flex items-center top-8 right-0 bg-white shadow-lg border
          hover:bg-gray-200 rounded-md p-2'>
            <FontAwesomeIcon icon={faSignOut} />
            <button className='w-full text-left p-2 ' onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHeader;
