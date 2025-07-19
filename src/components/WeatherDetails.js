// src/components/WeatherDetails.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faThermometerHalf,
  faWind,
  faTint,
  faCompass,
  faCloudRain,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const WeatherDetails = ({ weather }) => {
  const getWindDirectionIcon = (degrees) => {
    return (
      <FontAwesomeIcon 
        icon={faArrowUp} 
        style={{ 
          transform: `rotate(${degrees}deg)`,
          color: '#4ca1af',
          fontSize: '14px'
        }} 
      />
    );
  };

  const formatVisibility = (visibility) => {
    return visibility >= 1000
      ? `${(visibility / 1000).toFixed(1)} km`
      : `${visibility} m`;
  };

  return (
    <div className="weather-details-grid">
      <div className="detail-card">
        <FontAwesomeIcon icon={faThermometerHalf} className="detail-icon" />
        <div className="detail-info">
          <p className="detail-label">Feels like</p>
          <p className="detail-value">
            {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
      </div>

      <div className="detail-card">
        <FontAwesomeIcon icon={faWind} className="detail-icon" />
        <div className="detail-info">
          <p className="detail-label">Wind</p>
          <p className="detail-value wind-value">
            {weather.wind.speed} m/s 
            <span className="wind-direction">
              {getWindDirectionIcon(weather.wind.deg)}
            </span>
          </p>
        </div>
      </div>

      <div className="detail-card">
        <FontAwesomeIcon icon={faTint} className="detail-icon" />
        <div className="detail-info">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{weather.main.humidity}%</p>
        </div>
      </div>

      <div className="detail-card">
        <FontAwesomeIcon icon={faCompass} className="detail-icon" />
        <div className="detail-info">
          <p className="detail-label">Pressure</p>
          <p className="detail-value">{weather.main.pressure} hPa</p>
        </div>
      </div>

      <div className="detail-card">
        <FontAwesomeIcon icon={faEye} className="detail-icon" />
        <div className="detail-info">
          <p className="detail-label">Visibility</p>
          <p className="detail-value">{formatVisibility(weather.visibility)}</p>
        </div>
      </div>

      {weather.rain && (
        <div className="detail-card">
          <FontAwesomeIcon icon={faCloudRain} className="detail-icon" />
          <div className="detail-info">
            <p className="detail-label">Rain (1h)</p>
            <p className="detail-value">{weather.rain["1h"] || 0} mm</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;
