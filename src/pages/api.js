// services/api.js
import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: 'https://ua-alumhi-hub-be.onrender.com',
  withCredentials: true, // Add this if you need to send cookies with requests
});

// Function to set the admin token in localStorage and in Axios headers
const setAdminToken = (token) => {
  localStorage.setItem('adminToken', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Get the admin token from localStorage
const adminToken = localStorage.getItem('adminToken');
if (adminToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
  setAdminToken(adminToken);
}

// Attach the setAdminToken function to the Axios instance
api.setAdminToken = setAdminToken;

export default api;
