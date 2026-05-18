import axios from 'axios';

const api = axios.create({
  // Vite automatically injects the correct string based on the current mode
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true // Essential for your HTTP-Only login cookies to pass through
});

export default api;
