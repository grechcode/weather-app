import styles from './button.module.css';
import { Icon } from 'components';
import { cn } from 'utils';

export const Button = ({ view = 'primary', text, icon, className = '', type = 'button', ...props }) => {
  return (
    <button className={cn(styles.button, styles[view], className)} type={type} {...props}>
      {text && <span>{text}</span>}
      {icon && <Icon icon={icon} className={styles.icon} />}
    </button>
  );
};
