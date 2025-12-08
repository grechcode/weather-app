import { LS_THEME_KEY } from 'constants';
import { useEffect } from 'react';
import { LS } from 'utils';

export const useOSTheme = (currentTheme, setCurrentTheme) => {
  useEffect(() => {
    LS.setValue(LS_THEME_KEY, currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const controller = new AbortController();

    const onChange = (e) => {
      const setTheme = e.matches ? 'dark' : 'light';
      setCurrentTheme(setTheme);
      document.documentElement.setAttribute('data-theme', setTheme);
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onChange, { signal: controller.signal });

    return () => controller.abort();
  }, [setCurrentTheme]);
};
