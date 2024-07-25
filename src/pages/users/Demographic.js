import React from 'react'
import UserHeader from '../../components/users/UserHeader';
import Sidebar from '../../components/users/Sidebar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroadcastTower, faCalendarAlt, faCalendarCheck, faCalendarDay, faGraduationCap, faHand, faHouse, faListNumeric, faMap, faMapMarked, faPerson, faRing, faUser } from '@fortawesome/free-solid-svg-icons';
import { BarChart } from '@mui/x-charts/BarChart';
import PieChartEvents from '../../components/users/PieChart';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import CivilStatus from '../../components/users/demographic_charts/CivilStatus';

function Demographic() {
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
            <FontAwesomeIcon icon={faListNumeric} />
            <p className='text-2xl ml-2 mr-2'>Total Responses:</p>
            <p className='font-bold text-2xl'>561</p>
          </div>
          <div className='grid grid-cols-2 p-10 place-content-center w-full'>
            {/* first column */}

             

            <div>
              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faPerson} />
                  <p className='text-lg ml-2 mr-2'>Mode Sex</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='text-lg'>
                <PieChartEvents happening={25} future={45} past={15} />
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faRing} />
                  <p className='text-lg ml-2 mr-2'>Mode Civil Status</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='text-lg'>
                <CivilStatus single={34} married={45} widow={34} singleparent={49} separated={6} />
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faUser} />
                  <p className='text-lg ml-2 mr-2'>Mean Age</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='text-lg'>
                <PieChartEvents happening={25} future={45} past={15} />
              </div>

              
              

            </div>

            {/* second column */}
            <div>
            <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faMapMarked} />
                  <p className='text-lg ml-2 mr-2'>Mode Region</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='text-lg'>
                <PieChartEvents happening={25} future={45} past={15} />
              </div>


              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faMap} />
                  <p className='text-lg ml-2 mr-2'>Mode Province</p>
                </div>
                <p className='font-bold text-2xl'>561</p>
              </div>

              <div className='text-lg'>
                <PieChartEvents happening={25} future={45} past={15} />
              </div>

              <div className='flex items-end'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faHouse} />
                  <p className='text-lg ml-2 mr-2'>Mode Residence</p>
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

export default Demographic