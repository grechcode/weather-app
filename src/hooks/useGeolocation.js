import { LS_RECENT_KEY } from 'constants';
import { useSearchContext } from './useSearchContext';
import { useWeatherContext } from './useWeatherContext';
import { LS } from 'utils';
import { INITIAL_CITY_NAME } from 'constants';
import { INITIAL_CITY_COORDS } from 'constants';
import { useEffect } from 'react';

import { LS_LOCATION_KEY } from 'constants';
import { useFetchWeather } from './useFetchWeather';

export const useGeolocation = () => {
  const { setIsSearchOpen, setCurrentCityCoords } = useWeatherContext();
  const {
    setInputValue,
    setSearchResult,
    setRecentQueries,
    setSuggestions,
    locationCoords,
    locationPreview,
    setLocationPreview,
    isLocationPreviewLoading,
    setIsLocationPreviewLoading,
    locationPreviewError,
    setLocationPreviewError,
    setSearchResultError,
    setSuggestionsError,
  } = useSearchContext();

  const fetchLocation = useFetchWeather(
    'main',
    setLocationPreview,
    setIsLocationPreviewLoading,
    setLocationPreviewError
  );

  useEffect(() => {
    if (!locationCoords) return;
    fetchLocation(locationCoords);
  }, [locationCoords, fetchLocation]);

  const setWeatherParams = (cityData) => {
    setIsSearchOpen(false);
    LS.setObject(LS_LOCATION_KEY, cityData);
    const newRecentQueries = LS.setInArray(LS_RECENT_KEY, cityData);
    setRecentQueries(newRecentQueries);
    setInputValue('');
    setCurrentCityCoords(cityData);
    setSearchResult(null);
    setSearchResultError(null);
    setSuggestions(null);
    setSuggestionsError(null);
  };

  const onApply = (e) => {
    e.stopPropagation();
    const cityData = { name: locationPreview.main.name, ...locationCoords };
    setWeatherParams(cityData);
    setLocationPreview(null);
    setIsLocationPreviewLoading(false);
    setLocationPreviewError(null);
  };

  const onReject = (e) => {
    e.stopPropagation();
    const cityData = { name: INITIAL_CITY_NAME, ...INITIAL_CITY_COORDS };
    setWeatherParams(cityData);
    setLocationPreview(null);
    setIsLocationPreviewLoading(false);
    setLocationPreviewError(null);
  };

  return {
    locationPreview,
    isLocationPreviewLoading,
    locationPreviewError,
    fetchLocation,
    onApply,
    onReject,
  };
};
