// src/components/LoadingSpinner.js

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = "Loading weather data..." }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;