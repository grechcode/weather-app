import { getForecastData, getWeatherData } from 'api';
import { LS_CACHED_PREVIEW_KEY } from 'constants';
import { useCallback } from 'react';
import { formatForecastData, formatMainData, getDatetimeParams, LS } from 'utils';

export const useFetchWeather = (weatherType, setData, setIsLoading, setError) => {
  const fetchWeather = useCallback(
    async (cityData) => {
      const { lat, lon, name } = cityData;
      let cachedPreview = LS.getObject(LS_CACHED_PREVIEW_KEY);
      if (!cachedPreview) cachedPreview = {};
      const cityID = `${lat}-${lon}`;
      try {
        setIsLoading(true);
        setError(null);
        setData(null);
        if (weatherType === 'main') {
          const cachedData = cachedPreview[cityID];
          if (cachedData) {
            const timeDifference = Math.floor((Date.now() - cachedData.timestamp) / 1000 / 60);
            if (timeDifference < 5) {
              const datetimeParams = getDatetimeParams({ timezone: cachedData.main.timezone });
              cachedData.main.datetimeParams = datetimeParams;
              setData(cachedData);
              return;
            }
          }
          const weatherData = await getWeatherData(lat, lon);
          const formattedData = formatMainData(weatherData, name);
          cachedPreview[cityID] = formattedData;
          LS.setObject(LS_CACHED_PREVIEW_KEY, cachedPreview);
          setData(formattedData);
        }
        if (weatherType === 'forecast') {
          const weatherData = await getForecastData(lat, lon);
          const formattedData = formatForecastData(weatherData);
          setData(formattedData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [weatherType, setData, setIsLoading, setError]
  );

  return fetchWeather;
};
