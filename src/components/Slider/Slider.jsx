import styles from './slider.module.css';
import { useState } from 'react';
import { TabBar, Button, Swiper, SkeletonSwiper } from 'components';
import { useForecastWeather, useWeatherContext } from 'hooks';
import { FORECAST_TABS, ERROR_RELOAD_BUTTON_TEXT } from 'constants';

export const Slider = () => {
  const { isSearchOpen } = useWeatherContext();
  const { forecastWeather, isForecastWeatherLoading, forecastWeatherError, fetchForecastWeather } =
    useForecastWeather();

  const [activeTab, setActiveTab] = useState(FORECAST_TABS[0]);

  return (
    <section className={styles.forecast}>
      <h2 className="hidden">Сведения о прогнозе</h2>
      <header className={styles.forecastHeader}>
        <h2 className={styles.forecastTitle}>Прогноз:</h2>
        <nav className={styles.forecastNav}>
          <TabBar
            items={forecastWeather?.tabs || FORECAST_TABS}
            activeItem={activeTab}
            onTabClick={(item) => setActiveTab(item)}
          />
        </nav>
      </header>
      {isForecastWeatherLoading && <SkeletonSwiper />}
      {forecastWeatherError && (
        <div className={styles.errorWrapper}>
          <Button
            text={ERROR_RELOAD_BUTTON_TEXT}
            onClick={fetchForecastWeather}
            tabIndex={isSearchOpen ? -1 : undefined}
          />
        </div>
      )}
      {forecastWeather &&
        forecastWeather?.tabs.map((item) => (
          <Swiper
            key={forecastWeather[item.id]}
            cards={forecastWeather[item.id]}
            isVisible={item.id === activeTab.id}
            isSearchOpen={isSearchOpen}
          />
        ))}
      {}
    </section>
  );
};
