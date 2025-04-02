import axios from 'axios';

export const server = process.env.NODE_ENV === 'production'
  ? 'https://plpfinalproject-2.onrender.com/api/v2'
  : 'http://localhost:8000/api/v2';

export const socket_server = process.env.NODE_ENV === 'production'
  ? 'wss://plpfinalproject-2.onrender.com/'
  : 'ws://localhost:8000';

// Add axios default configuration
axios.defaults.withCredentials = true;

// Add request interceptor to handle CORS and credentials
axios.interceptors.request.use((config) => {
  // Add CORS headers
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
  return config;
});

// Add response interceptor for better error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the full error details in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
    }
    
    // In production, log minimal information
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });

    return Promise.reject(error);
  }
);


