import React from 'react'
import UserHeader from '../../components/users/UserHeader';
import Sidebar from '../../components/users/Sidebar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroadcastTower, faCalendarAlt, faCalendarCheck, faCalendarDay, faFeed, faGraduationCap, faHand, faKeyboard, faMessage, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from '@mui/x-charts/BarChart';
import PieChartEvents from '../../components/users/PieChart';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import api from '../api';
import axios from 'axios';

function Dashboard({ logout }) {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [alumni, setAlumni] = useState(0);
  const [users, setUsers] = useState(0);
  const [message, setMessage] = useState(0);
  const [post, setPost] = useState(0);
  const [comment, setComment] = useState(0);
  const [survey, setSurvey] = useState(0);

  const [event, setEvent] = useState(0);
  const [happening, setHappening] = useState(0);
  const [future, setFuture] = useState(0);
  const [past, setPast] = useState(0);

  const [toggled, setToggle] = useState(true);
  const pushCon = () => {
    setToggle(!toggled);
  }


  useEffect(() => {
    // Fetch events from the server
    api.get(`/getDashboardStats`)
      .then(response => {
        console.log(response);
        setAlumni(response.data[0].totalAlumni);
        setUsers(response.data[0].totalUsers)
        setMessage(response.data[0].totalMessage);
        setPost(response.data[0].totalPost)
        setComment(response.data[0].totalComment)
        setSurvey(response.data[0].totalResponse);
        setEvent(response.data[0].totalEvent);
        setHappening(response.data[0].totalEventHap);
        setFuture(response.data[0].totalEventFuture);
        setPast(response.data[0].totalEventPast);
      })
      .catch(error => {
        console.error(error);
        if (error.response.status === 401){
          logout();
        }
      });
  }, []);

  
  return (
    <div className='minbackground flex w-screen min-h-screen'>
      <div className={`${toggled ? "w-64" : ""}`}>
        <Sidebar handleClick={pushCon} />
      </div>
      <div className='p-4 flex-1 w-full flex flex-col items-center'>
        <div className='flex justify-center items-start'>
          <UserHeader />
        </div>

        <div className=' mt-[6rem] w-full'>

          <div className='flex items-center'>
            <p className='font-bold text-3xl text-start'>Welcome, {adminUName}! ✋</p>
          </div>

          <div>
            <h1 className='text-4xl font-bold text-start mt-6'>Dashboard</h1>
            <hr className='border-t-2 border-black mt-2'></hr>
          </div>

          <div className='grid grid-cols-2 p-10 place-content-center w-full gap-4'>
            {/* first column */}
            <div className='bg-white p-4 rounded-md shadow-md h-3/5 grid grid-cols-3 gap-4'>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <p className='text-lg ml-2 mr-2'>Total Alumni</p>
                </div>
                <p className='font-bold text-2xl'>{alumni}</p>
              </div>

              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faUser} />
                  <p className='text-lg ml-2 mr-2'>Total Users</p>
                </div>
                <p className='font-bold text-2xl'>{users}</p>
              </div>

              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faMessage} />
                  <p className='text-lg ml-2 mr-2'>Total Messages</p>
                </div>
                <p className='font-bold text-2xl'>{message}</p>
              </div>

              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faFeed} />
                  <p className='text-lg ml-2 mr-2'>Total Posts</p>
                </div>
                <p className='font-bold text-2xl'>{post}</p>
              </div>

              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faKeyboard} />
                  <p className='text-lg ml-2 mr-2'>Total Comments</p>
                </div>
                <p className='font-bold text-2xl'>{comment}</p>
              </div>

              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faNewspaper} />
                  <p className='text-lg ml-2 mr-2'>Total Survey Responses</p>
                </div>
                <p className='font-bold text-2xl'>{survey}</p>
              </div>
            </div>


            {/* second column */}
            <div>
              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <p className='text-lg ml-2 mr-2 font-bold'>Total Events</p>
                </div>
                <p className='font-bold text-2xl'>{event}</p>
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendarDay} />
                  <p className='text-lg ml-2 mr-2'>Happening</p>
                </div>
                <p className='font-bold text-2xl'>{happening}</p>
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendar} />
                  <p className='text-lg ml-2 mr-2'>Future</p>
                </div>
                <p className='font-bold text-2xl'>{future}</p>
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  <p className='text-lg ml-2 mr-2'>Past</p>
                </div>
                <p className='font-bold text-2xl'>{past}</p>
              </div>

              <div className='text-lg'>
                <PieChartEvents happening={happening} future={future} past={past} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard