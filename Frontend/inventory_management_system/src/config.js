/**
 * Configuration file for Inventory Management System
 *
 * These values can be overridden by environment variables:
 * - REACT_APP_NETWORK_IP: IP address of the machine running the backend server
 * - REACT_APP_API_PORT: Port number of the backend server
 *
 * To set environment variables, create a .env file in the root directory:
 * REACT_APP_NETWORK_IP=192.168.0.7
 * REACT_APP_API_PORT=3001
 */

// Network configuration
export const NETWORK_IP = process.env.REACT_APP_NETWORK_IP || '192.168.0.7';
export const API_PORT = process.env.REACT_APP_API_PORT || 3001;

// Derived URLs
export const API_BASE_URL = `http://${NETWORK_IP}:${API_PORT}`;
export const WS_URL = `http://${NETWORK_IP}:${API_PORT}`;