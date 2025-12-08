import { useWeatherContext } from 'hooks';
import styles from './footer.module.css';

export const Footer = ({ href }) => {
  const { isSearchOpen } = useWeatherContext();

  return (
    <footer className={styles.footer}>
      <div>
        Проект выполнен в рамках стажировки{' '}
        <a
          href={href ?? 'https://preax.ru'}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
          tabIndex={isSearchOpen ? -1 : undefined}
        >
          PREAX
        </a>
      </div>
    </footer>
  );
};
