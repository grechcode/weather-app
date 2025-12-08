import { useThemeContext, useWeatherContext } from 'hooks';
import styles from './switch.module.css';
import { Icon } from 'components';
import { cn } from 'utils';

export const Switch = () => {
  const { currentTheme, setCurrentTheme } = useThemeContext();
  const { isSearchOpen } = useWeatherContext();

  const onClick = () => {
    const setTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(setTheme);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(styles.button, isSearchOpen && styles.hide)}
      tabIndex={isSearchOpen ? -1 : undefined}
      aria-label={`Изменить тему на ${currentTheme === 'dark' ? 'светлую' : 'темную'}`}
    >
      <div className={cn(styles.slider, currentTheme === 'dark' && styles.sliderActive)} />
      <Icon icon="sun" className={cn(styles.icon, currentTheme === 'light' && styles.iconActive)} />
      <Icon icon="moon" className={cn(styles.icon, currentTheme === 'dark' && styles.iconActive)} />
    </button>
  );
};
