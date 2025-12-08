import { getCityData } from 'api';
import { useCallback } from 'react';

export const useFetchCityData = (dataType, setData, setIsLoading, setError) => {
  const fetchCityData = useCallback(
    async (inputValue, signal) => {
      try {
        setIsLoading(true);
        setError(null);
        if (dataType === 'searchResult') {
          if (!inputValue) return;
          const cityData = await getCityData(inputValue, signal);
          if (!cityData.length) throw Error('Попробуйте другое название.');
          const cityDataObject = { name: cityData[0].name, lat: cityData[0].lat, lon: cityData[0].lon };
          setData(cityDataObject);
        }
        if (dataType === 'suggestions') {
          const cityData = await getCityData(inputValue, signal);
          if (!cityData.length) throw Error('Попробуйте другое название.');
          setData(cityData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [dataType, setData, setIsLoading, setError]
  );

  return fetchCityData;
};
