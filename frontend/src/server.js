import axios from 'axios';

// Get the API URL based on environment
const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_PRODUCTION_API_URL
  : process.env.REACT_APP_API_URL || "http://localhost:8000";

// Get the Socket URL based on environment
const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_PRODUCTION_SOCKET_URL
  : process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:8000";

export const backend_url = API_URL;
export const socketServer = SOCKET_URL;

console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', API_URL);
console.log('Socket URL:', SOCKET_URL);

// Create axios instance with base URL
const server = axios.create({
  baseURL: API_URL + '/api/v2',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor to add the token to all requests
server.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
server.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default server;


