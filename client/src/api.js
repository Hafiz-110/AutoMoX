import axios from 'axios';

const API = axios.create({
  // This is the base URL for your backend
  baseURL: 'http://localhost:5000', 
});

// You can also add global headers here later (like for Auth tokens)
// API.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default API;
