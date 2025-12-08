import { useEffect, useState } from 'react';
import { useFetchWeather } from './useFetchWeather';

export const useFetchPreview = (cityData) => {
  const [cityPreview, setCityPreview] = useState(null);
  const [isCityPreviewLoading, setIsCityPreviewLoading] = useState(false);
  const [cityPreviewError, setCityPreviewError] = useState(null);

  const fetchData = useFetchWeather('main', setCityPreview, setIsCityPreviewLoading, setCityPreviewError);

  useEffect(() => {
    if (!cityData) return;
    fetchData(cityData);
  }, [cityData, fetchData]);

  return { cityPreview, isCityPreviewLoading, cityPreviewError, fetchPreview: () => fetchData(cityData) };
};
