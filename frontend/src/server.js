export const server = process.env.NODE_ENV === 'production'
  ? 'https://plpfinalproject-2.onrender.com/api/v2'
  : 'http://localhost:8000/api/v2';

export const socket_server = process.env.NODE_ENV === 'production'
  ? 'wss://plpfinalproject-2.onrender.com/'
  : 'ws://localhost:8000';


