import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setData(null);
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
     const apiKey = "dec2fb3c75636957a2d5ae24009ab2a8";

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}&units=metric`;

      const response = await axios.get(url);

      setData(response.data);
    } catch (err) {
      console.log(err);

      if (err.response?.status === 404) {
        setError(
          `City "${city}" not found. Please enter a valid city name.`
        );
      } else if (err.response?.status === 401) {
        setError("Invalid API key. Please check your API key.");
      } else {
        setError("Unable to fetch weather data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">

      {/* Background Clouds */}
      <div className="cloud cloud-one"></div>
      <div className="cloud cloud-two"></div>
      <div className="cloud cloud-three"></div>

      {/* Header */}
      <header className="header">
        <div className="header-icon">🌤️</div>

        <div>
          <h1>Weather Report</h1>
          <p>Get real-time weather updates for any city!</p>
        </div>
      </header>

      {/* Search Section */}
      <div className="search-section">

        <div className="search-input-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
          />
        </div>

        <button
          className="report-button"
          onClick={getWeather}
          disabled={loading}
        >
          <span>➤</span>
          {loading ? "Loading..." : "Get Report"}
        </button>

      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="loading-message">
          Getting weather information...
        </div>
      )}

      {/* Weather Result */}
      {data && !loading && (
        <div className="weather-container">

          {/* Left Weather Card */}
          <div className="main-weather-card">

            <div className="weather-content">

              <div className="weather-icon-large">
                {data.weather[0].main === "Clear"
                  ? "☀️"
                  : data.weather[0].main === "Clouds"
                  ? "🌤️"
                  : data.weather[0].main === "Rain"
                  ? "🌧️"
                  : data.weather[0].main === "Thunderstorm"
                  ? "⛈️"
                  : data.weather[0].main === "Snow"
                  ? "❄️"
                  : "🌤️"}
              </div>

              <div className="location-info">

                <h2>{data.name}</h2>

                <p className="condition">
                  {data.weather[0].description}
                </p>

                <h3>
                  {data.main.temp.toFixed(2)}°C
                </h3>

                <p className="feels-like">
                  🌡️ Feels like{" "}
                  {Math.round(data.main.feels_like)}°C
                </p>

              </div>

            </div>

          </div>

          {/* Right Details Card */}
          <div className="details-card">

            <div className="detail-row">
              <div className="detail-icon">☀️</div>

              <div className="detail-label">
                Weather
              </div>

              <div className="detail-value">
                {data.weather[0].main}
              </div>
            </div>


            <div className="detail-row">
              <div className="detail-icon">🌡️</div>

              <div className="detail-label">
                Temperature
              </div>

              <div className="detail-value">
                {data.main.temp.toFixed(2)} °C
              </div>
            </div>


            <div className="detail-row">
              <div className="detail-icon">💧</div>

              <div className="detail-label">
                Humidity
              </div>

              <div className="detail-value">
                {data.main.humidity}%
              </div>
            </div>


            <div className="detail-row">
              <div className="detail-icon">💨</div>

              <div className="detail-label">
                Wind Speed
              </div>

              <div className="detail-value">
                {data.wind.speed} m/s
              </div>
            </div>


            <div className="detail-row last-row">
              <div className="detail-icon">➤</div>

              <div className="detail-label">
                Description
              </div>

              <div className="detail-value description-value">
                {data.weather[0].description}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Footer */}
      <div className="footer">
        ♡ &nbsp; Stay updated. Stay prepared.
      </div>

    </div>
  );
}

export default App;