import axios from 'axios';

// Get the API URL based on environment
const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_PRODUCTION_API_URL
  : process.env.REACT_APP_API_URL;

// Get the Socket URL based on environment
const SOCKET_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_PRODUCTION_SOCKET_URL
  : process.env.REACT_APP_SOCKET_SERVER_URL;

export const backend_url = API_URL;
export const socketServer = SOCKET_URL;

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
    // Log request details
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

// Add response interceptor
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
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      stack: error.stack
    });
    return Promise.reject(error);
  }
);

// Export both as default and named export
export { server };
export default server;


