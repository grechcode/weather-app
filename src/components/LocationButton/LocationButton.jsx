import styles from './locationButton.module.css';
import { Button } from 'components';
import { INITIAL_CITY_COORDS, LOCATION_ERROR_ARRAY } from 'constants';
import { useSearchContext, useWeatherContext } from 'hooks';

export const LocationButton = ({ inputRef }) => {
  const { setLocationCoords, setIsLocationPreviewLoading, setLocationPreviewError } = useSearchContext();
  const { setCurrentCityCoords } = useWeatherContext();

  const onRequestLocation = () => {
    setIsLocationPreviewLoading(true);

    const geolocationSuccess = (position) => {
      setLocationCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
    };

    const geolocationPreviewError = () => {
      setCurrentCityCoords(INITIAL_CITY_COORDS);
      setLocationPreviewError(LOCATION_ERROR_ARRAY);
      inputRef.current.focus();
    };

    window.navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationPreviewError);
  };
  return <Button icon="location" className={styles.button} onClick={onRequestLocation} />;
};
