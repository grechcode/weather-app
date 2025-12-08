import styles from './layout.module.css';
import { Content, Footer, Header, Main, Slider } from 'components';
import { useOSTheme, useThemeContext, useWeatherContext, useBackground } from 'hooks';
import { SearchProvider } from 'providers';
import { cn } from 'utils';

export const Layout = () => {
  const { currentTheme, setCurrentTheme } = useThemeContext();
  const { mainWeather, isSearchOpen } = useWeatherContext();

  const backgroundImage = useBackground(mainWeather, currentTheme);
  useOSTheme(currentTheme, setCurrentTheme);

  return (
    <div className={styles.layout} style={{ backgroundImage }}>
      <h1 className="hidden">Приложение прогноза погоды</h1>

      <Content>
        <SearchProvider>
          <Header />
        </SearchProvider>
        <div className={cn(isSearchOpen && styles.blur)}>
          <Main />
          <Slider />
          <Footer />
        </div>
      </Content>
    </div>
  );
};
