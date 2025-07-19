// src/components/WeatherCard.js

import React from "react";
import WeatherDetails from "./WeatherDetails";
import SunriseSunset from "./SunriseSunset";

const WeatherCard = ({ weather, uvIndex, aqi }) => {
  if (!weather) {
    return null;
  }

  // Destructure the weather data
  const { name, main, weather: weatherDetails, sys, timezone } = weather;
  const { temp, temp_min, temp_max } = main;
  const { description, icon } = weatherDetails[0];

  return (
    <div className="weather-card">
      <div className="main-weather">
        <div className="location-time">
          <h2>{name}</h2>
          <p className="current-time">
            {new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        <div className="current-weather">
          <div className="weather-main">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              loading="lazy"
              className="weather-icon"
            />
            <div className="temperature-info">
              <p className="temperature">{Math.round(temp)}°C</p>
              <p className="description">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
              <p className="temp-range">
                H: {Math.round(temp_max)}° L: {Math.round(temp_min)}°
              </p>
            </div>
          </div>
        </div>
      </div>

      <WeatherDetails weather={weather} />
      
      {sys && (
        <SunriseSunset 
          sunrise={sys.sunrise} 
          sunset={sys.sunset} 
          timezone={timezone}
        />
      )}
    </div>
  );
};

export default WeatherCard;
