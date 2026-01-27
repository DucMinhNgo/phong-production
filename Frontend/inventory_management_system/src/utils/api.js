import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const currentLanguage = localStorage.getItem('language') || 'vi';
    
    config.headers['Accept-Language'] = currentLanguage;
    config.headers['X-Language'] = currentLanguage;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      console.log('Translated error message:', error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;