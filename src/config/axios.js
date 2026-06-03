// frontend/src/config/axios.js
import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor (optional - for debugging)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`📤 Making ${config.method.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for error handling)
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`📥 Response received from: ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.data);
      
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          console.log('Unauthorized! Redirecting to login...');
          // You can redirect to login page here if needed
          break;
        case 403:
          console.log('Forbidden! You don\'t have permission.');
          break;
        case 404:
          console.log('Resource not found!');
          break;
        case 500:
          console.log('Server error! Please try again later.');
          break;
        default:
          console.log('Something went wrong!');
      }
    } else if (error.request) {
      // Request was made but no response
      console.error('No response from server:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;