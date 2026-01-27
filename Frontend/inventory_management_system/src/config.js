export const NETWORK_IP = process.env.REACT_APP_NETWORK_IP || '192.168.0.100';
export const API_PORT = process.env.REACT_APP_API_PORT || 3002;

const USE_PRODUCTION = process.env.REACT_APP_USE_PRODUCTION === 'true';
const USE_CUSTOM_URL = process.env.REACT_APP_USE_CUSTOM_URL === 'true';

export const API_BASE_URL = (() => {
  if (USE_CUSTOM_URL && process.env.REACT_APP_CUSTOM_API_URL) {
    return process.env.REACT_APP_CUSTOM_API_URL;
  }
  if (USE_PRODUCTION) {
    return 'https://phong-production-backend.vercel.app';
  }
  return `http://${NETWORK_IP}:${API_PORT}`;
})();

export const WS_URL = (() => {
  if (USE_CUSTOM_URL && process.env.REACT_APP_CUSTOM_WS_URL) {
    return process.env.REACT_APP_CUSTOM_WS_URL;
  }
  if (USE_PRODUCTION) {
    return 'https://phong-production-backend.vercel.app';
  }
  return `http://${NETWORK_IP}:${API_PORT}`;
})();

console.log('Environment check:', {
  USE_PRODUCTION_CONST: USE_PRODUCTION,
  USE_PRODUCTION_ENV: process.env.REACT_APP_USE_PRODUCTION,
  API_BASE_URL: API_BASE_URL,
  ALL_ENV: process.env
});
