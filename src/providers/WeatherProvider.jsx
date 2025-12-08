import { WeatherContext } from 'context';
import { useState } from 'react';
import { getInitialCityData } from 'utils';

export const WeatherProvider = ({ children }) => {
  // INITIAL_STATES
  const initialCityData = getInitialCityData();
  const initialCoords = {
    lat: initialCityData.lat,
    lon: initialCityData.lon,
  };

  const [mainWeather, setMainWeather] = useState(null);
  const [isMainWeatherLoading, setIsMainWeatherLoading] = useState(false);
  const [mainWeatherError, setMainWeatherError] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [isForecastWeatherLoading, setIsForecastWeatherLoading] = useState(false);
  const [forecastWeatherError, setForecastWeatherError] = useState(null);
  const [currentCityCoords, setCurrentCityCoords] = useState(initialCoords);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <WeatherContext.Provider
      value={{
        mainWeather,
        setMainWeather,
        isMainWeatherLoading,
        setIsMainWeatherLoading,
        mainWeatherError,
        setMainWeatherError,
        forecastWeather,
        setForecastWeather,
        isForecastWeatherLoading,
        setIsForecastWeatherLoading,
        forecastWeatherError,
        setForecastWeatherError,
        currentCityCoords,
        setCurrentCityCoords,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
