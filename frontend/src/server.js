import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const server = axios.create({
  baseURL: `${BACKEND_URL}/api/v2`,
  withCredentials: true,
});

// Use the same backend URL for WebSocket, just change the protocol
export const socketServer = BACKEND_URL.replace(/^http/, 'ws');

export default server;

// Add request interceptor to handle CORS and credentials
server.interceptors.request.use((config) => {
  // Add CORS headers
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
  return config;
});

// Add response interceptor for better error handling
server.interceptors.response.use(
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


