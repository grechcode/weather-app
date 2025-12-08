import { LS_THEME_KEY } from 'constants';
import { LS } from './localStorage';

export const getInitialTheme = () => {
  const savedTheme = LS.getValue(LS_THEME_KEY);
  const OSTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialThemeState = savedTheme || OSTheme || 'light';
  return initialThemeState;
};
