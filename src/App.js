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
// import 'primeflex/primeflex.css'; // Optional, for additional utilities


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [uName, setUName] = useState(localStorage.getItem('uName'));

  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));
  const [adminUName, setAdminUName] = useState(localStorage.getItem('adminUName'));

  // useEffect(() => {
  //   if (token) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   }
  //   if (adminToken) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
  //   }
  // }, [token, adminToken]);

  const login = async (email, password) => {
    console.log("logging1");
    const response = await axios.post('http://localhost:3001/signin', {
      email,
      password
    });
    console.log("response", response);
    const token = response.data.token;
    const uName = response.data.name;

    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('uName', uName);
    setUName(uName);
  };

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

  return (
    <div className='App flex flex-col justify-center items-center m-0 p-0'>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login handleLogin={login} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={
            token ? <Home logout={logout} /> : <Navigate to="/" />
          } />
          <Route path="/notifications" element={
            token ? <MyNotifications /> : <Navigate to="/" />
          } />
          <Route path="/messagebroadcast" element={
            token ? <MessageBroadcast /> : <Navigate to="/" />
          } />
          <Route path="/events" element={
            token ? <MyEvents logout={logout} /> : <Navigate to="/" />
          } />
          <Route path="/myprofile" element={
            token ? <MyProfile logout={logout} /> : <Navigate to="/" />
          } /> */}

          <Route path='/' element={<AdminLogin handleAdminLogin={adminlogin} />} />
          <Route path="/admin/dashboard" element={
            adminToken ? <Dashboard logout={adminLogout} /> : <Navigate to="/admin/signin" />
          } />
          <Route path="/admin/users" element={
            adminToken ? <Users logout={adminLogout} /> : <Navigate to="/admin/signin" />
          } />
          <Route path="/admin/events" element={
            adminToken ? <Events logout={adminLogout} /> : <Navigate to="/admin/signin" />
          } />
          <Route path="/admin/demographic" element={
            adminToken ? <Demographic logout={adminLogout} /> : <Navigate to="/admin/signin" />
          } />
          <Route path="/admin/survey" element={
            adminToken ? <TracerSurvey logout={adminLogout} /> : <Navigate to="/admin/signin" />
          } />
          <Route path="/admin/alumni" element={
            adminToken ? <Alumni logout={adminLogout} /> : <Navigate to="/admin/signin" />
          } />
          <Route path="/admin/messagebroadcast" element={
            adminToken ? <AdminMessageBroadcast /> : <Navigate to="/admin/signin" />
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;