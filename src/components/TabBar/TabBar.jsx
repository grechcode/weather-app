import styles from './tabBar.module.css';
import { Tab } from 'components';

export const TabBar = ({ items, activeItem, onTabClick }) => {
  return (
    <ul className={styles.tabBar} role="tablist">
      {items.map((item) => (
        <li key={item.name}>
          <Tab
            onClick={() => onTabClick(item)}
            active={item.name === activeItem?.name}
            aria-label={item.aria}
          >
            {item.name}
          </Tab>
        </li>
      ))}
    </ul>
  );
};
