import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../src/pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminHome from './pages/users/AdminHome';
import Events from './pages/users/Events';
import AdminLogin from './pages/users/AdminLogin';
import MyNotifications from './pages/MyNotifications';
import AdminMessageBroadcast from './pages/users/AdminMessageBroadcast';
import MessageBroadcast from './pages/MessageBroadcast';
import MyEvents from './pages/MyEvents';
import MyProfile from './pages/MyProfile';
import Dashboard from './pages/users/Dashboard';
import Users from './pages/users/Users';
import api from './pages/api';

import 'primereact/resources/themes/saga-blue/theme.css'; // You can choose any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Demographic from './pages/users/Demographic';
import TracerSurvey from './pages/users/TracerSurvey';
import Alumni from './pages/users/Alumni';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import Employment from './pages/users/Employment';
// import 'primeflex/primeflex.css'; // Optional, for additional utilities

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [uName, setUName] = useState(localStorage.getItem('uName'));
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));
  const [showMessageBox, setShowMessageBox] = useState(false);

  const adminlogin = async (username, password) => {
    console.log("logging2");
    const response = await api.post('/admin/signin', {
      username,
      password,
    });

    

    const token = response.data.token;
    const uName = response.data.username;

    console.log(token);
    setAdminToken(token);
    setAdminUName(uName);

    localStorage.setItem('adminUName', uName);
    localStorage.setItem('adminToken', token);

    console.log("admin login", response);
    if (response.status === 200 && response.data.token) {
      api.setAdminToken(response.data.token); // Set the token if login is successful
    }
    return response;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('uName');
    localStorage.removeItem('userId');
  };

  const adminLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUName');
    localStorage.removeItem('adminUserId');
  };

  useEffect(() => {
    if (!adminToken) {
      setShowMessageBox(true);
    }
  }, [adminToken]);

  return (
    <div className='App flex flex-col justify-center items-center m-0 p-0'>
      <Router>
        <Routes>
          <Route path='/' element={<AdminLogin handleAdminLogin={adminlogin} />} />
          <Route path="/admin/dashboard" element={
            adminToken ? <Dashboard logout={adminLogout} /> : <Navigate to="/" />
          } />
          <Route path="/admin/users" element={
            adminToken ? <Users logout={adminLogout} /> : <Navigate to="/" />
          } />
          <Route path="/admin/events" element={
            adminToken ? <Events logout={adminLogout} /> : <Navigate to="/" />
          } />
          <Route path="/admin/demographic" element={
            adminToken ? <Demographic logout={adminLogout} /> : <Navigate to="/" />
          } />

          <Route path="/admin/employment" element={
            adminToken ? <Employment logout={adminLogout} /> : <Navigate to="/" />
          } />

          <Route path="/admin/survey" element={
            adminToken ? <TracerSurvey logout={adminLogout} /> : <Navigate to="/" />
          } />
          <Route path="/admin/alumni" element={
            adminToken ? <Alumni logout={adminLogout} /> : <Navigate to="/" />
          } />
          <Route path="/admin/messagebroadcast" element={
            adminToken ? <AdminMessageBroadcast /> : <Navigate to="/" />
          } />
        </Routes>
      </Router>
      {showMessageBox && (
        <>
          <div className="overlay backdrop-blur-sm"></div>
          <div className="message-box rounded-md">
            <div className='flex justify-center items-center mb-4'>
              <FontAwesomeIcon icon={faWarning} color='red' />
              <p>Your session has expired. Please sign in again!</p>
            </div>
            
            <button onClick={() => setShowMessageBox(false)} className='bg-slate-900 text-white rounded-sm'>OK</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
