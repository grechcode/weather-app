import { useEffect } from 'react';
import { useWeatherContext } from './useWeatherContext';
import { useFetchWeather } from './useFetchWeather';

export const useMainWeather = () => {
  const {
    currentCityCoords,
    mainWeather,
    setMainWeather,
    isMainWeatherLoading,
    setIsMainWeatherLoading,
    mainWeatherError,
    setMainWeatherError,
  } = useWeatherContext();

  const fetchMainWeather = useFetchWeather(
    'main',
    setMainWeather,
    setIsMainWeatherLoading,
    setMainWeatherError
  );

  useEffect(() => {
    fetchMainWeather(currentCityCoords);
  }, [currentCityCoords, fetchMainWeather]);

  return {
    mainWeather,
    isMainWeatherLoading,
    mainWeatherError,
    fetchMainWeather: () => fetchMainWeather(currentCityCoords),
  };
};
