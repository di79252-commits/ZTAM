
import { useState, useEffect } from 'react';
import { fetchWeather } from './api/fetchWeather.js';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ZADANIE 3: wykrywanie połączenia z internetem
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const search = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError('Wpisz nazwę miasta.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h1>Pogoda</h1>

      <form onSubmit={search}>
        <input
          type="text"
          className="search"
          placeholder="Wpisz miasto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Nazwa miasta"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Pobieranie...' : 'Szukaj'}
        </button>
      </form>

      {/* ZADANIE 3: komunikat o braku internetu */}
      {!online && (
        <p className="message error">
          Brak połączenia — pokazuję ostatnio pobrane dane.
        </p>
      )}

      {loading && (
        <p className="message">Pobieranie danych...</p>
      )}

      {error && (
        <p className="message error" role="alert">
          {error}
        </p>
      )}

      {weather && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>

          {/* ZADANIE 1: temperatura zaokrąglona do pełnych stopni */}
          <div className="city-temp">
            {Math.round(weather.main.temp)}°C
          </div>

          {/* ZADANIE 2: ikona i opis pogody */}
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>

          {/* ZADANIE 2: dodatkowe parametry pogodowe */}
          <div className="weather-details">
            <p>
              <strong>Ciśnienie:</strong>{' '}
              {weather.main.pressure} hPa
            </p>

            <p>
              <strong>Wilgotność:</strong>{' '}
              {weather.main.humidity}%
            </p>

            <p>
              <strong>Prędkość wiatru:</strong>{' '}
              {weather.wind.speed} m/s
            </p>

            {weather.wind.gust !== undefined && (
              <p>
                <strong>Porywy wiatru:</strong>{' '}
                {weather.wind.gust} m/s
              </p>
            )}

            {weather.wind.deg !== undefined && (
              <p>
                <strong>Kierunek wiatru:</strong>{' '}
                {weather.wind.deg}°
              </p>
            )}
          </div>

          {/* ZADANIE 3: czas pomiaru */}
          <p className="message">
            Pomiar z godziny:{' '}
            {new Date(weather.dt * 1000).toLocaleTimeString(
              'pl-PL',
              { hour: '2-digit', minute: '2-digit' }
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
