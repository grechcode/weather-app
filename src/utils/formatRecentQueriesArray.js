import { RECENT_QUERIES_LIMIT } from 'constants';

export const formatRecentQueriesArray = (value, array) => {
  let index = -1;
  array.forEach((item, i) => {
    if (item.name === value.name) index = i;
  });

  if (index !== -1) array.splice(index, 1);
  array.unshift(value);
  array.splice(RECENT_QUERIES_LIMIT);

  return array;
};
