import { useEffect } from 'react';
import { useWeatherContext } from './useWeatherContext';
import { useFetchWeather } from './useFetchWeather';

export const useForecastWeather = () => {
  const {
    currentCityCoords,
    forecastWeather,
    setForecastWeather,
    isForecastWeatherLoading,
    setIsForecastWeatherLoading,
    forecastWeatherError,
    setForecastWeatherError,
  } = useWeatherContext();

  const fetchForecastWeather = useFetchWeather(
    'forecast',
    setForecastWeather,
    setIsForecastWeatherLoading,
    setForecastWeatherError
  );

  useEffect(() => {
    fetchForecastWeather(currentCityCoords);
  }, [currentCityCoords, fetchForecastWeather]);

  return {
    forecastWeather,
    isForecastWeatherLoading,
    forecastWeatherError,
    fetchForecastWeather: () => fetchForecastWeather(currentCityCoords),
  };
};
