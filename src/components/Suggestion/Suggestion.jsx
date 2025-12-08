import { useSearchContext } from 'hooks';
import styles from './suggestion.module.css';
import { formatSuggestionString } from 'utils';

export const Suggestion = ({ displayName, name, lat, lon }) => {
  const { inputValue, setSearchResult, setSuggestions } = useSearchContext();

  const cityData = { name, lat, lon };

  const onClick = () => {
    setSearchResult(cityData);
    setSuggestions(null);
  };

  const suggestionString = formatSuggestionString(displayName, inputValue);

  return (
    <button
      className={styles.suggestion}
      onClick={onClick}
      title={name}
      type="button"
      aria-label={`Искать погоду в ${name}`}
    >
      <span>{suggestionString.start}</span>
      <span className={styles.inputValue}>{suggestionString.center}</span>
      <span>{suggestionString.end}</span>
    </button>
  );
};
