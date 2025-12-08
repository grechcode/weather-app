import { Button } from 'components';
import styles from './errorMessage.module.css';
import { ERROR_TITLE, ERROR_DESCRIPTION, ERROR_RELOAD_BUTTON_TEXT } from 'constants';
import { cn } from 'utils';

export const ErrorMessage = ({
  title = ERROR_TITLE,
  descriptions = [ERROR_DESCRIPTION],
  color = 'light',
  size = 'large',
  align = 'center',
  reloadButtonText = ERROR_RELOAD_BUTTON_TEXT,
  onReload,
}) => {
  return (
    <div className={cn(styles.errorMessage, styles[size], styles[align], styles[color])} data="error-message">
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        {descriptions.map((text) => (
          <span key={`error-message-${text.slice(0, 5)}`} className={styles.description}>
            {text}
          </span>
        ))}
      </div>
      {onReload && <Button className={styles.reloadButton} text={reloadButtonText} onClick={onReload} />}
    </div>
  );
};
