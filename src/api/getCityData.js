import { ERROR_DESCRIPTION } from 'constants';
import { CITY_INFO_URL } from 'constants';

export const getCityData = async (query, signal) => {
  try {
    const res = await fetch(`${CITY_INFO_URL}?q=${query}&format=json&addressdetails=1`, { signal: signal });
    const data = await res.json();

    if (data.error) {
      throw Error(ERROR_DESCRIPTION);
    }
    return data;
  } catch (error) {
    throw Error(ERROR_DESCRIPTION);
  }
};
