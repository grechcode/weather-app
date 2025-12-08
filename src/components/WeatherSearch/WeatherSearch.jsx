import styles from './weatherSearch.module.css';
import { useForm, useKeyPress, useSearchContext, useWeatherContext } from 'hooks';
import { Dropdown, LocationButton } from 'components';
import { Input } from 'components';

export const WeatherSearch = () => {
  const { inputValue, setSuggestions } = useSearchContext();
  const { isSearchOpen, setIsSearchOpen } = useWeatherContext();
  const { inputRef, onInputChange, onInputClear, onSubmit } = useForm();

  useKeyPress('Escape', () => setIsSearchOpen(false));

  const onSearchOpen = (e) => {
    e.stopPropagation();
    setIsSearchOpen(true);
    setSuggestions(null);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.search} onClick={(e) => onSearchOpen(e)}>
        <Input
          id="searchCity"
          placeholder="Поиск по городу"
          value={inputValue}
          onChange={onInputChange}
          onSearch={onSubmit}
          onClear={onInputClear}
          autoComplete="off"
          ref={inputRef}
        >
          <LocationButton inputRef={inputRef} />
        </Input>
        {isSearchOpen && <Dropdown />}
      </div>
    </form>
  );
};
