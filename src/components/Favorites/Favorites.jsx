import { WeatherCardList } from 'components';
import { useSearchContext } from 'hooks';
import { FAVORITE_QUERIES_LIMIT } from 'constants';

export const Favorites = ({ list }) => {
  const { favorites } = useSearchContext();

  const FavoritesCounter = () => (
    <span>
      {favorites.length}/{FAVORITE_QUERIES_LIMIT}
    </span>
  );

  return <WeatherCardList title="Избранные" list={list} hideEmptyList={true} widget={<FavoritesCounter />} />;
};
