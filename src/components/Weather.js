// src/components/Weather.js

import React, { useState, useCallback } from "react";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard"; // Import the new component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import "./Weather.css";

const Weather = () => {
  // State to store the city name entered by the user
  const [city, setCity] = useState("");
  // State to store the weather data fetched from the API
  const [weather, setWeather] = useState(null);
  // State to handle loading state
  const [loading, setLoading] = useState(false);
  // State to handle errors
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [forecast, setForecast] = useState([]); // New state for forecast

  // API keys from environment variables
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const geoapifyApiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;

  // Function to fetch weather by coordinates (GPS)
  const fetchWeatherByCoords = useCallback(
    async (lat, lon) => {
      if (!weatherApiKey) {
        setError("Weather API key is missing. Please check your environment variables.");
        return;
      }
      
      setLoading(true);
      setError(null);

      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
        );
        if (!weatherResponse.ok) {
          throw new Error("Weather data not found for your location");
        }
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);
        setCity(weatherData.name);

        // Fetch forecast data by coordinates
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
        );
        if (!forecastResponse.ok) {
          throw new Error("Forecast data not found");
        }
        const forecastData = await forecastResponse.json();
        const dailyForecasts = {};
        forecastData.list.forEach((item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
          }
        });
        setForecast(Object.values(dailyForecasts).slice(1, 6));
      } catch (error) {
        setError(error.message);
        setWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [weatherApiKey]
  );

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied. Please enable location services.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("Location request timed out.");
            break;
          default:
            setError("An unknown error occurred while retrieving location.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  // Function to fetch weather data from the API
  const fetchWeather = useCallback(
    async (selectedCity) => {
      if (!selectedCity) {
        setError("Please enter a city name");
        return;
      }
      
      if (!weatherApiKey) {
        setError("Weather API key is missing. Please check your environment variables.");
        return;
      }
      
      setLoading(true);
      setError(null);

      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${weatherApiKey}&units=metric`
        );
        if (!weatherResponse.ok) {
          throw new Error("City not found");
        }
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);
        setCity(weatherData.name); // Set city to the official name

        // Fetch forecast data
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${weatherApiKey}&units=metric`
        );
        if (!forecastResponse.ok) {
          throw new Error("Forecast data not found");
        }
        const forecastData = await forecastResponse.json();
        // Filter for next 5 days (one entry per day around noon)
        const dailyForecasts = {};
        forecastData.list.forEach((item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
          }
        });
        setForecast(Object.values(dailyForecasts).slice(1, 6)); // Get next 5 days, skipping today
      } catch (error) {
        setError(error.message);
        // If the new search fails, clear the old data to reset the UI
        setWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [weatherApiKey]
  );

  const fetchSuggestions = async (text) => {
    if (text.length > 2 && geoapifyApiKey) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${geoapifyApiKey}`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (value.length > 2) {
      fetchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedCity = suggestion.properties.city;
    setCity(selectedCity);
    setSuggestions([]);
    setShowSuggestions(false);
    fetchWeather(selectedCity);
  };

  const handleSearch = () => {
    fetchWeather(city);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={`weather-app-container ${weather ? "active" : ""}`}>
      <div className="search-container">
        <h1>Weather Forecast</h1>
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Enter city"
          />
          <button onClick={handleSearch}>Get Weather</button>
          <button 
            className="gps-button" 
            onClick={getCurrentLocation}
            title="Use my current location"
          >
            <FontAwesomeIcon icon={faLocationArrow} />
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.properties.place_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="weather-content">
        {weather && <WeatherCard weather={weather} />}
        {forecast.length > 0 && (
          <div className="forecast-section">
            <h2>5-Day Forecast</h2>
            {forecast.map((dayForecast) => (
              <ForecastCard key={dayForecast.dt} forecast={dayForecast} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <span className="developer-name">Nilesh Paarmar</span>
        <span className="separator">|</span>
        <div className="links">
          <a
            href="https://your-portfolio-link.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Weather;
