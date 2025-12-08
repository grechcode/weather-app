import styles from './likeButton.module.css';
import { useSearchContext } from 'hooks';
import { cn, LS } from 'utils';
import { Icon } from 'components';
import { FAVORITE_QUERIES_LIMIT, LS_FAVORITE_KEY } from 'constants';

export const LikeButton = ({ cityData }) => {
  const { favorites, setFavorites } = useSearchContext();

  const isFavoriteListFull = favorites.length >= FAVORITE_QUERIES_LIMIT;

  const isFavorite = favorites.some((city) => city.name === cityData?.name);

  const onLike = (e) => {
    e.stopPropagation();
    const isFavorite = favorites.some((element) => element.name === cityData.name);

    if (isFavorite) {
      let updatelist = favorites.filter((element) => element.name !== cityData.name);
      setFavorites(updatelist);
      LS.deleteFromArray(LS_FAVORITE_KEY, cityData);
    } else {
      setFavorites((prev) => [...prev, cityData]);
      LS.setInArray(LS_FAVORITE_KEY, cityData);
    }
  };

  return (
    <button
      className={cn(styles.favoriteButton, isFavorite && styles.favorite)}
      onClick={onLike}
      type="button"
      disabled={isFavoriteListFull && !isFavorite}
      aria-label={`Добавить ${cityData?.name} в избранное`}
    >
      <Icon icon="heart" className={styles.heartIcon} />
    </button>
  );
};
