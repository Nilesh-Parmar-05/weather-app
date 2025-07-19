// src/components/UVIndex.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const UVIndex = ({ uvIndex }) => {
  const getUVLevel = (uv) => {
    if (uv <= 2) return { level: 'Low', color: '#00e400', advice: 'No protection needed' };
    if (uv <= 5) return { level: 'Moderate', color: '#ffff00', advice: 'Some protection required' };
    if (uv <= 7) return { level: 'High', color: '#ff7e00', advice: 'Protection essential' };
    if (uv <= 10) return { level: 'Very High', color: '#ff0000', advice: 'Extra protection needed' };
    return { level: 'Extreme', color: '#8f3f97', advice: 'Avoid sun exposure' };
  };

  if (uvIndex === null || uvIndex === undefined) {
    return (
      <div className="uv-index-card">
        <h3>UV Index</h3>
        <p className="no-data">Data unavailable</p>
      </div>
    );
  }

  const { level, color, advice } = getUVLevel(uvIndex);

  return (
    <div className="uv-index-card">
      <h3>
        <FontAwesomeIcon icon={faSun} className="uv-icon" />
        UV Index
      </h3>
      <div className="uv-info">
        <div className="uv-level">
          <span className="uv-number" style={{ color }}>{uvIndex}</span>
          <span className="uv-text" style={{ color }}>{level}</span>
        </div>
        <p className="uv-advice">{advice}</p>
        <div className="uv-scale">
          <div className="scale-bar">
            <div 
              className="scale-indicator" 
              style={{ 
                left: `${Math.min(uvIndex * 8.33, 100)}%`,
                backgroundColor: color 
              }}
            ></div>
          </div>
          <div className="scale-labels">
            <span>0</span>
            <span>6</span>
            <span>12+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UVIndex;