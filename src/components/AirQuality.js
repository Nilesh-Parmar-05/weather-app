// src/components/AirQuality.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';

const AirQuality = ({ aqi }) => {
  const getAQILevel = (index) => {
    switch (index) {
      case 1: return { level: 'Good', color: '#00e400', description: 'Air quality is satisfactory' };
      case 2: return { level: 'Fair', color: '#ffff00', description: 'Air quality is acceptable' };
      case 3: return { level: 'Moderate', color: '#ff7e00', description: 'May cause minor issues for sensitive people' };
      case 4: return { level: 'Poor', color: '#ff0000', description: 'May cause health issues for sensitive groups' };
      case 5: return { level: 'Very Poor', color: '#8f3f97', description: 'Health warnings for everyone' };
      default: return { level: 'Unknown', color: '#999', description: 'Data unavailable' };
    }
  };

  if (!aqi) {
    return (
      <div className="air-quality-card">
        <h3>Air Quality</h3>
        <p className="no-data">Data unavailable</p>
      </div>
    );
  }

  const { level, color, description } = getAQILevel(aqi.main.aqi);

  return (
    <div className="air-quality-card">
      <h3>
        <FontAwesomeIcon icon={faWind} className="aqi-icon" />
        Air Quality
      </h3>
      <div className="aqi-info">
        <div className="aqi-level" style={{ color }}>
          <span className="aqi-number">{aqi.main.aqi}</span>
          <span className="aqi-text">{level}</span>
        </div>
        <p className="aqi-description">{description}</p>
        <div className="pollutants">
          <div className="pollutant">
            <span>PM2.5</span>
            <span>{aqi.components.pm2_5?.toFixed(1) || 'N/A'} μg/m³</span>
          </div>
          <div className="pollutant">
            <span>PM10</span>
            <span>{aqi.components.pm10?.toFixed(1) || 'N/A'} μg/m³</span>
          </div>
          <div className="pollutant">
            <span>O₃</span>
            <span>{aqi.components.o3?.toFixed(1) || 'N/A'} μg/m³</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;