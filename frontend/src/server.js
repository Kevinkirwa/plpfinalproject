import axios from 'axios';

// Get the API URL from environment variables
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://plpfinalproject-2.onrender.com'
  : 'http://localhost:8000';
export const SOCKET_URL = process.env.REACT_APP_SOCKET_SERVER_URL || API_URL;
export const backend_url = API_URL;  // For backward compatibility

console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', API_URL);
console.log('Socket URL:', SOCKET_URL);

// Create axios instance with base URL
const server = axios.create({
  baseURL: `${API_URL}/api/v2`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor
server.interceptors.request.use(
  (config) => {
    // Log request details in all environments for debugging
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      withCredentials: config.withCredentials
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', {
      message: error.message,
      stack: error.stack
    });
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
server.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText
    });
    return response;
  },
  (error) => {
    // Log detailed error information in all environments
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      stack: error.stack
    });
    
    // Check for specific error types
    if (error.response?.status === 401) {
      console.log('Authentication error - user not logged in or token expired');
    } else if (error.response?.status === 403) {
      console.log('Authorization error - user not permitted');
    } else if (!error.response) {
      console.log('Network error - no response from server');
    }
    
    return Promise.reject(error);
  }
);

// Export socket server URL
export const socketServer = SOCKET_URL;

// Export server as both default and named export
export { server };
export default server;


