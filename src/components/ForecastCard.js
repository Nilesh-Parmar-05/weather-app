// src/components/ForecastCard.js

import React from "react";

const ForecastCard = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000).toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const icon = forecast.weather[0].icon;
  const description = forecast.weather[0].description;
  const temp = Math.round(forecast.main.temp);

  return (
    <div className="forecast-card">
      <h3>{date}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        loading="lazy"
      />
      <p className="temperature">{temp}°C</p>
      <p className="description">{description}</p>
    </div>
  );
};

export default ForecastCard;
