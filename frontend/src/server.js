import axios from 'axios';

// Get the API URL from environment variables or use localhost as fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with base URL
const server = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Export the socket server URL based on environment
export const socketServer = process.env.NODE_ENV === 'production' 
  ? API_URL 
  : 'ws://localhost:8000';

// Log the URLs for debugging
console.log("Backend URL:", API_URL);
console.log("Socket Server URL:", socketServer);

// Add request interceptor to handle CORS and credentials
server.interceptors.request.use((config) => {
  // Add CORS headers
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
  config.headers['Access-Control-Allow-Credentials'] = 'true';
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

// Export the API URL and server instance
export { API_URL as backend_url, server };
export default server;


