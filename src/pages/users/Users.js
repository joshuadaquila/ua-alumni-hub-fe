import React from 'react'
import Sidebar from '../../components/users/Sidebar';
import UserHeader from '../../components/users/UserHeader';
import { useState } from 'react';
import UsersTable from '../../components/users/UsersTable';
import AddBtn from '../../components/users/AddBtn';
import { useEffect } from 'react';
import axios from 'axios';
import NewUserCon from '../../components/users/NewUserCon';
import EditUserCon from '../../components/users/EditUserCon';
import api from '../api';

function Users() {
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const [users, setUsers] = useState([]);
  const [toggled, setToggle] = useState(true);
  const [showUserCon, setShowUserCon] = useState(false);

  console.log(users);

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
    api.get('/getUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log("error in home get events");
        console.error(error);
        // logout();
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

        <div className=' mt-[6rem] shadow-md text-black'>
          <p className='text-2xl font-bold'>List of Users</p>
          <div className='flex justify-end'>
            <AddBtn add={handleNewUserCon}/>
          </div>
          {showUserCon && <NewUserCon close={handleNewUserCon} /> }

          <UsersTable usersData={users}/>
        </div>
      </div>
    </div>
  )
}

export default Users