import styles from './recentQueries.module.css';
import { Icon, WeatherCardList } from 'components';
import { useSearchContext } from 'hooks';
import { LS_RECENT_KEY } from 'constants';
import { LS } from 'utils';
import { memo } from 'react';

export const RecentQueries = ({ list }) => {
  const { recentQueries, setRecentQueries } = useSearchContext();

  const RecentCleanButton = memo(() => {
    const onDelete = (e) => {
      e.stopPropagation();
      LS.remove(LS_RECENT_KEY);
      setRecentQueries({});
    };

    return (
      <button
        onClick={onDelete}
        type="button"
        className={styles.cleanButton}
        disabled={!recentQueries}
        aria-label="Очистить историю поиска"
      >
        <Icon icon="delete" className={styles.cleanButton} />
      </button>
    );
  });

  return (
    <WeatherCardList
      title="Недавно смотрели"
      list={list}
      emptyMessage="История поиска пустая."
      widget={<RecentCleanButton />}
    />
  );
};
