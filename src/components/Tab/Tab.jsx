import { cn } from 'utils';
import styles from './tab.module.css';
import { useWeatherContext } from 'hooks';

export const Tab = ({ active, children, ...props }) => {
  const { isSearchOpen } = useWeatherContext();

  return (
    <button
      className={cn(styles.tabBtn, active && styles.active)}
      role="tab"
      tabIndex={isSearchOpen ? -1 : undefined}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
