import { WeatherContext } from "context";
import { useContext } from "react";

export const useWeatherContext = () => useContext(WeatherContext);
