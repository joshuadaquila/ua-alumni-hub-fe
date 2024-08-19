import React, { useState, useEffect } from 'react';
import UserHeader from '../../components/users/UserHeader';
import Sidebar from '../../components/users/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../api';

function Dashboard({ logout }) {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [alumniData, setAlumniData] = useState([]);
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [toggled, setToggle] = useState(true);

  const pushCon = () => {
    setToggle(!toggled);
  };

  useEffect(() => {
    // Fetch dashboard stats from the server
    api.get(`/getDashboardStats`)
      .then(response => {
        setAlumniData(response.data);
        setTotalAlumni(response.data[0].totalAlumni)
      })
      .catch(error => {
        console.error(error);
        if (error.response.status === 401) {
          logout();
        }
      });

    // Fetch future events from the server
    api.get(`/getFutureEvents`)
      .then(response => {
        setFutureEvents(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch past events from the server
    api.get(`/getPastEvents`)
      .then(response => {
        setPastEvents(response.data);
      })
      .catch(error => {
        console.error(error);
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

        <div className='mt-[6rem] w-full'>
          <div className='flex items-center'>
            <p className='font-bold text-3xl text-start'>Welcome, {adminUName}! ✋</p>
          </div>

          <div>
            <h1 className='text-4xl font-bold text-start mt-6'>Dashboard</h1>
            <hr className='border-t-2 border-black mt-2'></hr>
          </div>

          <div className='grid grid-cols-1 p-10 place-content-center w-full gap-4'>
            {/* First row */}
            <div className='bg-white p-4 rounded-md shadow-md '>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <p className='text-lg ml-2 mr-2'>Total Alumni: {totalAlumni}</p>
                </div>
              </div>
            </div>

            {/* Second row */}
            <div className='bg-white p-4 rounded-md shadow-md'>
              {/* Render DataTable for Future Events */}
              <h2 className='text-lg font-bold mb-4'>Incoming Events</h2>
              <DataTable value={futureEvents} responsiveLayout="scroll">
                <Column field="title" header="Event Title"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="date" header="Date" body={(rowData) => rowData.date.split('T')[0]}></Column>
                <Column field="time" header="Start Time"></Column>
                <Column field="endtime" header="End Time"></Column>
                <Column field="location" header="Location"></Column>
                <Column field="capacity" header="Capacity"></Column>
                <Column field="totalRegistration" header="Total Registration"></Column>
                {/* Add more columns as necessary */}
              </DataTable>
            </div>

            <div className='bg-white p-4 rounded-md shadow-md'>
              {/* Render DataTable for Past Events */}
              <h2 className='text-lg font-bold mt-6 mb-4'>Past Events</h2>
              <DataTable value={pastEvents} responsiveLayout="scroll">
                <Column field="title" header="Event Title"></Column>
                <Column field="title" header="Event Title"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="date" header="Date" body={(rowData) => rowData.date.split('T')[0]}></Column>
                <Column field="time" header="Start Time"></Column>
                <Column field="endtime" header="End Time"></Column>
                <Column field="location" header="Location"></Column>
                <Column field="capacity" header="Capacity"></Column>
                {/* Add more columns as necessary */}
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
