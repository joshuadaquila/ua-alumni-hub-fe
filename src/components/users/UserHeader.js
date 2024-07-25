import React from 'react';
import ualogo from "../../resources/ualogo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBroadcastTower, faCalendar, faCalendarCheck, faCalendarDay, faChartLine, faMessage, faPerson, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faCalendarXmark, faUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

function UserHeader({ page, getEvents }) {
  const [uName, setUName] = useState(localStorage.getItem('adminUName'));
  console.log(uName);
  return (
    <div className=' fixed outline-slate-800 top-0 min-w-full
    grid grid-cols-3 h-[6rem] place-items-center place-content-center z-40 backdrop-blur-lg'>

     <div className={` ${page == "event"? "grid" : "hidden"} col-span-2 grid-cols-5 gap-8 rounded-full`}>

      <div className=' bg-opacity-50 homebtn  flex flex-row justify-center items-center
         rounded-md max-h-svh cursor-pointer shadow-md p-2' onClick={() => getEvents("all")}>
         <FontAwesomeIcon size='xl'  icon={faCalendar} />
         <p className='text-lg ml-2'>All</p>
       </div>
       <div className=' bg-opacity-50 homebtn  flex flex-row justify-center items-center
         rounded-md max-h-svh cursor-pointer shadow-md p-2' onClick={() => getEvents("future")}>
         <FontAwesomeIcon size='xl'  icon={faCalendarAlt} />
         <p className='text-lg ml-2'>Upcoming</p>
       </div>

       <div className=' bg-opacity-50 homebtn  flex flex-row justify-center items-center
         rounded-md max-h-svh cursor-pointer shadow-md p-2' onClick={() => getEvents("happening")}>
         <FontAwesomeIcon size='xl'  icon={faCalendarDay} />
         <p className='text-lg ml-2'>Present</p>
       </div>

       <div className=' bg-opacity-50 homebtn flex flex-row justify-center items-center
         rounded-md max-h-svh cursor-pointer shadow-md p-2' onClick={() => getEvents("past")}>
         <FontAwesomeIcon size='xl'  icon={faCalendarCheck} />
         <p className='text-lg ml-2'>Past</p>
       </div>

       <div className=' bg-opacity-50 homebtn  flex flex-row justify-center items-center
         rounded-md max-h-svh cursor-pointer shadow-md p-2'>
         <FontAwesomeIcon size='xl'  icon={faChartLine} />
         <p className='text-lg ml-2'>Insights</p>
       </div>



     </div>

     <div className={`flex justify-center items-center ${page == "event"? "" : "col-start-3"}`}>
       <h1>{uName}</h1>
     </div>

   </div>
  )
}

export default UserHeader