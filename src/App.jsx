import { WeatherProvider, ThemeProvider } from 'providers';
import { Layout } from './components';

export const App = () => {
  return (
    <WeatherProvider>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </WeatherProvider>
  );
};
