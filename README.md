# Weather Forecast App

A modern, responsive weather forecast application built with React that provides current weather conditions and 5-day forecasts for cities worldwide.

## Features

- 🌤️ Current weather conditions with detailed information
- 📅 5-day weather forecast
- 🔍 City search with autocomplete suggestions
- 📱 Fully responsive design for all devices
- 🎨 Beautiful glassmorphism UI design
- ⚡ Smooth animations and transitions

## Demo

![Weather App Screenshot](screenshot.png)

## Technologies Used

- React 19.1.0
- OpenWeatherMap API for weather data
- Geoapify API for location autocomplete
- CSS3 with modern features (backdrop-filter, flexbox, grid)
- Responsive design principles

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- API keys from OpenWeatherMap and Geoapify

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-forecast-app.git
   cd weather-forecast-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and add your API keys:
   ```
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
   REACT_APP_GEOAPIFY_API_KEY=your_geoapify_api_key_here
   ```

4. **Get API Keys**

   **OpenWeatherMap API:**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file as `REACT_APP_WEATHER_API_KEY`

   **Geoapify API (for autocomplete):**
   - Visit [Geoapify](https://www.geoapify.com/)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file as `REACT_APP_GEOAPIFY_API_KEY`

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app should now be running!

## Usage

1. **Search for a city**: Type in the search bar to get autocomplete suggestions
2. **Select a city**: Click on a suggestion or press Enter to search
3. **View weather**: See current conditions on the left and 5-day forecast on the right
4. **Responsive design**: The layout adapts to different screen sizes

## Project Structure

```
src/
├── components/
│   ├── Weather.js          # Main weather component
│   ├── Weather.css         # Styles for weather component
│   ├── WeatherCard.js      # Current weather display
│   └── ForecastCard.js     # Forecast item component
├── App.js                  # Main app component
├── App.css                 # Global app styles
└── index.js               # App entry point
```

## Environment Variables

The app requires the following environment variables:

- `REACT_APP_WEATHER_API_KEY`: Your OpenWeatherMap API key
- `REACT_APP_GEOAPIFY_API_KEY`: Your Geoapify API key for location autocomplete

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

**Nilesh Paarmar**
- Portfolio: [Your Portfolio Link]
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Location autocomplete by [Geoapify](https://www.geoapify.com/)
- Icons and weather information courtesy of OpenWeatherMap

---

⭐ If you found this project helpful, please give it a star!