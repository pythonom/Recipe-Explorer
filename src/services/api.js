import axios from 'axios';

const API_BASE_URL = 'https://api.spoonacular.com';
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add API key to every request
api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      apiKey: API_KEY,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const messages = {
        401: 'Invalid API key. Please check your configuration.',
        402: 'API quota exceeded. Please try again later.',
        404: 'Recipe not found.',
        429: 'Too many requests. Please slow down.',
        500: 'Server error. Please try again later.',
      };
      const message = messages[status] || `API Error: ${status}`;
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    return Promise.reject(error);
  }
);

export default api;
