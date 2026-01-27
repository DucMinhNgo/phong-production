import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const ApiStatus = () => {
  const [isOnline, setIsOnline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/`, {
          method: 'GET',
          timeout: 5000
        });
        setIsOnline(response.ok);
      } catch (error) {
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    checkApiStatus();
  }, []);

  const getStatusColor = () => {
    if (loading) return 'text-warning';
    return isOnline ? 'text-success' : 'text-danger';
  };

  const getStatusIcon = () => {
    if (loading) return '⏳';
    return isOnline ? '🟢' : '🔴';
  };

  const getStatusText = () => {
    if (loading) return 'Checking...';
    return isOnline ? 'Online' : 'Offline';
  };

  const getApiType = () => {
    if (API_BASE_URL.includes('vercel.app')) return 'Production';
    if (API_BASE_URL.includes('localhost')) return 'Development';
    return 'Local Network';
  };

  return (
    <div className="api-status-container" style={{ 
      position: 'fixed', 
      bottom: '20px', 
      left: '20px', 
      zIndex: 1000,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <div className={`api-status ${getStatusColor()}`}>
        <span className="status-icon">{getStatusIcon()}</span>
        <span className="status-text ml-1">{getStatusText()}</span>
        <span className="api-type ml-2">({getApiType()})</span>
      </div>
      <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>
        {API_BASE_URL}
      </div>
    </div>
  );
};

export default ApiStatus;