import React from 'react'
import UserHeader from '../../components/users/UserHeader';
import Sidebar from '../../components/users/Sidebar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroadcastTower, faCalendarAlt, faCalendarCheck, faCalendarDay, faGraduationCap, faHand, faUser } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from '@mui/x-charts/BarChart';
import PieChartEvents from '../../components/users/PieChart';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

function Dashboard() {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [toggled, setToggle] = useState(true);
  const pushCon = () => {
    setToggle(!toggled);
  }
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

          <div className='grid grid-cols-2 p-10 place-content-center w-full'>
            {/* first column */}
            <div>
              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <p className='text-lg ml-2 mr-2'>Total Alumni</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faUser} />
                  <p className='text-lg ml-2 mr-2'>Total Users</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faBroadcastTower} />
                  <p className='text-lg ml-2 mr-2'>Total Message Broadcasted</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='text-lg'>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['Alumi', 'Users', 'Messages'] }]}
                  series={[{ data: [4, 5, 6] }]}
                  width={500}
                  height={300}
                />
              </div>
              

            </div>

            {/* second column */}
            <div>
              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <p className='text-lg ml-2 mr-2 font-bold'>Total Events</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendarDay} />
                  <p className='text-lg ml-2 mr-2'>Happening</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendar} />
                  <p className='text-lg ml-2 mr-2'>Future</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  <p className='text-lg ml-2 mr-2'>Past</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='text-lg'>
                <PieChartEvents happening={25} future={45} past={15} />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard