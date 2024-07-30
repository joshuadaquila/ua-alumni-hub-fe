// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,  // Add this if you need to send cookies with requests
});

const setAdminToken = (token) => {
  localStorage.setItem('adminToken', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const adminToken = localStorage.getItem('adminToken');
if (adminToken) {
  setAdminToken(adminToken);
}

api.setAdminToken = setAdminToken;

export default api;