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
    // Check for user token
    const token = localStorage.getItem('token');
    // Check for seller token
    const sellerToken = localStorage.getItem('seller_token');
    
    if (sellerToken && config.url.includes('/shop')) {
      config.headers.Authorization = `Bearer ${sellerToken}`;
      console.log('Adding seller token to request:', config.url);
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Adding user token to request:', config.url);
    } else {
      console.log('No token found for request:', config.url);
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
  (response) => {
    // If this is a login response, store the appropriate token
    if (response.config.url === '/shop/login-shop' && response.data.token) {
      console.log('Storing seller token from login response');
      localStorage.setItem('seller_token', response.data.token);
    } else if (response.config.url === '/user/login-user' && response.data.token) {
      console.log('Storing user token from login response');
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    
    if (error.response && error.response.status === 401) {
      // Clear appropriate token based on the URL
      if (error.config.url.includes('/shop')) {
        console.log('Clearing seller token due to 401 response');
        localStorage.removeItem('seller_token');
      } else {
        console.log('Clearing user token due to 401 response');
        localStorage.removeItem('token');
      }
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Export both as default and named export
export { server };
export default server;


