import styles from './header.module.css';
import { Logo, Switch, WeatherSearch } from 'components';
import { useWeatherContext } from 'hooks';
import { cn } from 'utils';

export const Header = () => {
  const { isSearchOpen } = useWeatherContext();

  return (
    <header className={styles.header}>
      <Logo isSearchOpen={isSearchOpen} />
      <div className={cn(styles.controls, isSearchOpen && styles.hide)}>
        <WeatherSearch />
        <Switch />
      </div>
    </header>
  );
};
