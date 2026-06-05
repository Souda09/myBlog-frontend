import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'https://blog-app-backend-rouge-tau.vercel.app/api',
  withCredentials: true, // Keep for cookie support
  headers: {
    'Content-Type': 'application/json',
  }
});

// ✅ Request interceptor - Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`📤 Making ${config.method.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`📥 Response received from: ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response error:', error.response.data);
      
      // ✅ Handle 401 - Token expired or invalid
      if (error.response.status === 401) {
        console.log('Unauthorized! Clearing localStorage and redirecting...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axiosInstance.defaults.headers.common['Authorization'];
        
        // Redirect to login if not already there
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
      }
      
      switch (error.response.status) {
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
      console.error('No response from server:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;