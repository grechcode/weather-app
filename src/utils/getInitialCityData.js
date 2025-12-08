import { LS } from './localStorage';
import { INITIAL_CITY_NAME, INITIAL_CITY_COORDS, LS_LOCATION_KEY } from 'constants';

export const getInitialCityData = () => {
  const locationCityData = LS.getObject(LS_LOCATION_KEY);
  const defaultCityData = {
    name: INITIAL_CITY_NAME,
    ...INITIAL_CITY_COORDS,
  };

  return locationCityData || defaultCityData;
};
