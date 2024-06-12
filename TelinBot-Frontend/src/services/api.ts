import axios from 'axios';

// Create an Axios instance with basic/default configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

// Export the instance
export default api;
