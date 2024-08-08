// Alumni.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import AddBtn from '../../components/users/AddBtn';
import axios from 'axios';
import NewUserCon from '../../components/users/NewUserCon';
import AlumniTable from '../../components/users/AlumniTable';
import PrintReport from '../../components/users/PrintReport';
import api from '../api';

export default function Alumni() {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [alumni, setAlumni] = useState([]);
  const [toggled, setToggle] = useState(true);
  const [showUserCon, setShowUserCon] = useState(false);

  const pushCon = () => {
    setToggle(!toggled);
  }
  
  const handleNewUserCon = () => {
    setShowUserCon(!showUserCon);
  }

  useEffect(() => {
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [adminToken]);

  useEffect(() => {
    api.get('/getAlumni')
      .then(response => {
        setAlumni(response.data);
      })
      .catch(error => {
        console.log("Error in fetching alumni data");
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

        <div className='mt-[6rem] shadow-md text-black'>
          <p className='text-2xl font-bold mb-12'>List of Alumni</p>
          <div className='flex justify-end mb-4'>
            {/* <AddBtn add={handleNewUserCon}/> */}
          </div>
          {showUserCon && <NewUserCon close={handleNewUserCon} />}

          <PrintReport title={"Alumni Table"}>
            <AlumniTable alumniData={alumni} />
          </PrintReport>
        </div>
      </div>
    </div>
  );
}
