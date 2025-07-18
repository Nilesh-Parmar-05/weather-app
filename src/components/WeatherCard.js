
// src/components/WeatherCard.js

import React from 'react';

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return null;
  }

  // Destructure the weather data
  const { name, main, weather: weatherDetails } = weather;
  const { temp, humidity } = main;
  const { description, icon } = weatherDetails[0];

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <div className="weather-info">
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
        />
        <p className="temperature">{temp}°C</p>
        <p className="description">{description}</p>
        <p>Humidity: {humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherCard;
