
// src/components/Weather.js

import React, { useState, useCallback } from 'react';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard'; // Import the new component
import './Weather.css';

const Weather = () => {
  // State to store the city name entered by the user
  const [city, setCity] = useState('');
  // State to store the weather data fetched from the API
  const [weather, setWeather] = useState(null);
  // State to handle loading state
  const [loading, setLoading] = useState(false);
  // State to handle errors
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [forecast, setForecast] = useState([]); // New state for forecast

  // API key for OpenWeatherMap
  const weatherApiKey = '74364ce6f837be594d8539f01a04c105';
  // API key for Geoapify - REPLACE WITH YOUR KEY
  const geoapifyApiKey = '15c79bdca58445498aa6dd97776d1dba';

  // Function to fetch weather data from the API
  const fetchWeather = useCallback(async (selectedCity) => {
    if (!selectedCity) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${weatherApiKey}&units=metric`
      );
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      setCity(weatherData.name); // Set city to the official name

      // Fetch forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${weatherApiKey}&units=metric`
      );
      if (!forecastResponse.ok) {
        throw new Error('Forecast data not found');
      }
      const forecastData = await forecastResponse.json();
      // Filter for next 5 days (one entry per day around noon)
      const dailyForecasts = {};
      forecastData.list.forEach(item => {
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
  }, [weatherApiKey]);


  const fetchSuggestions = async (text) => {
    if (text.length > 2) {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${geoapifyApiKey}`
        );
        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
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
    <div className={`weather-app-container ${weather ? 'active' : ''}`}>
      <div className="search-container">
        <h1>Weather Forecast</h1>
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Enter city"
          />
          <button onClick={handleSearch}>Get Weather</button>
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
          <a href="https://your-portfolio-link.com" target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
          <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Weather;
