import { Icon } from 'components';
import styles from './logo.module.css';

export const Logo = ({ href, isSearchOpen, ...props }) => {
  return (
    <a
      href={href ?? '/'}
      className={styles.link}
      aria-label="Логотип приложения WeatherApp"
      tabIndex={isSearchOpen ? -1 : undefined}
      {...props}
    >
      <Icon icon="logoDesktop" className={styles.logoDesktop} />
      <Icon icon="logoMobile" className={styles.logoMobile} />
    </a>
  );
};
