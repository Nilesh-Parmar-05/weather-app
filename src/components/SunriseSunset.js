// src/components/SunriseSunset.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const SunriseSunset = ({ sunrise, sunset, timezone }) => {
  const formatTime = (timestamp) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  return (
    <div className="sunrise-sunset-card">
      <h3>Sun & Moon</h3>
      <div className="sun-moon-info">
        <div className="sun-info">
          <FontAwesomeIcon icon={faSun} className="sun-icon" />
          <div>
            <p className="label">Sunrise</p>
            <p className="time">{formatTime(sunrise)}</p>
          </div>
        </div>
        <div className="moon-info">
          <FontAwesomeIcon icon={faMoon} className="moon-icon" />
          <div>
            <p className="label">Sunset</p>
            <p className="time">{formatTime(sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunset;
