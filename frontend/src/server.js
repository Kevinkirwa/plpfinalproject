export const server = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL
  : 'http://localhost:8000';

export const socket_server = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_SOCKET_SERVER
  : 'ws://localhost:8000';


