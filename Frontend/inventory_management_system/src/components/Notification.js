import React from 'react';

const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  const getTypeClass = (type) => {
    switch (type) {
      case 'success': return 'alert-success';
      case 'error': return 'alert-danger';
      case 'warning': return 'alert-warning';
      default: return 'alert-info';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div
      className={`alert ${getTypeClass(notification.type)} alert-dismissible fade show position-fixed`}
      style={{
        top: '70px',
        right: '20px',
        zIndex: 1050,
        minWidth: '300px',
        maxWidth: '500px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
      role="alert"
    >
      <div className="d-flex align-items-center">
        <span className="me-2" style={{ fontSize: '1.2em' }}>
          {getIcon(notification.type)}
        </span>
        <div className="flex-grow-1">
          {notification.message}
        </div>
        <button 
          type="button" 
          className="btn-close" 
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Notification;