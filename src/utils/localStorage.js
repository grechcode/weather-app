import { formatRecentQueriesArray } from './formatRecentQueriesArray.js';

export const LS = {
  setInArray: (key, value) => {
    if (localStorage.getItem(key)) {
      const data = JSON.parse(localStorage.getItem(key));
      const newArray = formatRecentQueriesArray(value, data);
      localStorage.setItem(key, JSON.stringify(newArray));
      return newArray;
    } else {
      localStorage.setItem(key, JSON.stringify([value]));
      return [value];
    }
  },

  deleteFromArray: (key, value) => {
    if (localStorage.getItem(key)) {
      const data = JSON.parse(localStorage.getItem(key));
      const newArray = data.filter((element) => element.name !== value.name);
      localStorage.setItem(key, JSON.stringify(newArray));
    }
  },

  getArray: (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) return data;
    else return [];
  },

  setObject: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getObject: (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data || null;
  },

  setValue: (key, value) => {
    localStorage.setItem(key, value);
  },

  getValue: (key) => {
    const data = localStorage.getItem(key);
    return data || null;
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },
};
