
// src/components/ForecastCard.js

import React from 'react';

const ForecastCard = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000).toLocaleDateString();
  const icon = forecast.weather[0].icon;
  const description = forecast.weather[0].description;
  const temp = Math.round(forecast.main.temp);

  return (
    <div className="forecast-card">
      <h3>{date}</h3>
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
      />
      <p className="temperature">{temp}°C</p>
      <p className="description">{description}</p>
    </div>
  );
};

export default ForecastCard;
