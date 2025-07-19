// src/components/HourlyForecast.js

import React from 'react';

const HourlyForecast = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-IN', { 
      hour: 'numeric',
      hour12: true 
    });
  };

  // Take first 24 hours (8 entries, every 3 hours)
  const next24Hours = hourlyData.slice(0, 8);

  return (
    <div className="hourly-forecast">
      <h3>24-Hour Forecast</h3>
      <div className="hourly-scroll">
        {next24Hours.map((hour, index) => (
          <div key={hour.dt} className="hourly-item">
            <p className="hour-time">
              {index === 0 ? 'Now' : formatHour(hour.dt)}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
              className="hour-icon"
            />
            <p className="hour-temp">{Math.round(hour.main.temp)}°</p>
            <p className="hour-rain">
              {hour.pop ? `${Math.round(hour.pop * 100)}%` : '0%'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;