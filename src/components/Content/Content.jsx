import styles from './content.module.css';

export const Content = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
