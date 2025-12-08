import { useBackground, useSearchContext, useThemeContext, useWeatherContext } from 'hooks';
import styles from './weatherCard.module.css';
import { getDatetimeParams, LS } from 'utils';
import { ErrorMessage, LikeButton } from 'components';
import { SkeletionWeatherCard } from './SkeletionWeatherCard';
import { LS_RECENT_KEY } from 'constants';
import { LS_CACHED_PREVIEW_KEY } from 'constants';

export const WeatherCard = ({ data, isLoading, error, onReload, likeButton = true }) => {
  const { currentTheme } = useThemeContext();

  const { setIsSearchOpen, setCurrentCityCoords, setMainWeather } = useWeatherContext();
  const {
    setInputValue,
    setSearchResult,
    setRecentQueries,
    setSuggestions,
    setLocationCoords,
    setLocationPreview,
    setIsLocationPreviewLoading,
    setLocationPreviewError,
  } = useSearchContext();

  const backgroundImage = useBackground(data, currentTheme);

  const cityData = { name: data?.main?.name, lat: data?.lat, lon: data?.lon };

  const onSearch = (e) => {
    e.stopPropagation();
    setIsSearchOpen(false);
    let cachedPreview = LS.getObject(LS_CACHED_PREVIEW_KEY);
    if (!cachedPreview) cachedPreview = {};
    const cityID = `${data?.lat}-${data?.lon}`;
    cachedPreview[cityID] = data;
    LS.setObject(LS_CACHED_PREVIEW_KEY, cachedPreview);
    const newRecentQueries = LS.setInArray(LS_RECENT_KEY, cityData);
    setRecentQueries(newRecentQueries);
    setInputValue('');
    setCurrentCityCoords(cityData);
    setMainWeather(data);
    setSearchResult(null);
    setSuggestions(null);
    setLocationCoords(null);
    setLocationPreview(null);
    setIsLocationPreviewLoading(false);
    setLocationPreviewError(null);
  };

  const datetimeParams = getDatetimeParams({ timezone: data?.main?.timezone });

  return (
    <>
      {isLoading && <SkeletionWeatherCard />}
      {error && (
        <div className={styles.errorWrapper}>
          <ErrorMessage title={error} size="medium" align="left" color="dark" onReload={onReload} />
        </div>
      )}
      {!isLoading && !error && data && (
        <div className={styles.weatherPreviewCard} style={{ backgroundImage }}>
          <button
            className={styles.searchButton}
            onClick={onSearch}
            type="button"
            aria-label={`Искать погоду в ${data?.main?.name}`}
          >
            <div className={styles.mainInfo}>
              <span>{data?.main?.name}</span>
              <span>{Math.round(data?.main?.temp)}°</span>
            </div>
            <div className={styles.description}>
              <span>{datetimeParams.time}</span>
              <span>{data?.main?.text}</span>
            </div>
          </button>
          {likeButton && <LikeButton cityData={cityData} />}
        </div>
      )}
    </>
  );
};
