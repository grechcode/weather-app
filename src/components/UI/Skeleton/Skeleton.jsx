import { cn } from 'utils';
import styles from './skeleton.module.css';

export const Skeleton = ({ className = '' }) => {
  return <div className={cn(styles.block, className)}></div>;
};
