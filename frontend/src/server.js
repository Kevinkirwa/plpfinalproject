import axios from 'axios';

export const server = process.env.NODE_ENV === 'production'
  ? 'https://plpfinalproject-2.onrender.com/api/v2'
  : 'http://localhost:8000/api/v2';

export const socket_server = process.env.NODE_ENV === 'production'
  ? 'wss://plpfinalproject-2.onrender.com/'
  : 'ws://localhost:8000';

// Add axios default configuration
axios.defaults.withCredentials = true;

// Add response interceptor for better error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return Promise.reject(error);
  }
);


