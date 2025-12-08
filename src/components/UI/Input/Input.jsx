import { cn } from 'utils';
import styles from './input.module.css';
import { Icon } from 'components';
import { forwardRef } from 'react';

export const Input = forwardRef(
  (
    { className = '', value, onSearch, onClear, searchButton = true, clearButton = true, children, ...props },
    ref
  ) => {
    return (
      <div className={styles.inputWrapper}>
        <input className={cn(styles.input, className)} value={value} type="search" ref={ref} {...props} />
        {searchButton && (
          <button className={styles.searchButton} type="button" onClick={onSearch}>
            <Icon icon="search" className={styles.icon} />
          </button>
        )}
        {clearButton && (
          <button className={styles.clearButton} type="button" onClick={onClear}>
            <Icon icon="clear" className={styles.icon} />
          </button>
        )}
        {children}
      </div>
    );
  }
);
