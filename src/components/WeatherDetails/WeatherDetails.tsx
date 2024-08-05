import { useMemo } from "react";
import { useWeatherStore } from "../../store/weatherStore";
import { formatTemperature } from "../../utils";
import styles from './WeatherDetails.module.css'
import Spinner from "../Spinner/Spinner";
import Alert from "../Alert/Alert";

export default function WeatherDetails() {
  const weather = useWeatherStore((state) => state.weather);
  const loading = useWeatherStore((state) => state.loading);
  const notFoundData = useWeatherStore((state) => state.notFoundData);

  const hasWeatherData = useMemo(() => weather?.name, [weather]);

  return (
    <>
      {notFoundData && <Alert>{'Ciudad no encontrada'}</Alert>}
      {loading && <Spinner />}
      {hasWeatherData && (
        <div className={styles.container}>
          <h2>Clima de: {weather!.name}</h2>
          <p className={styles.current}>{formatTemperature(weather!.main.temp )}&deg;C</p>
          <div className={styles.temperatures}>
          <p>Min: <span>{formatTemperature(weather!.main.temp_max)}&deg;C</span></p>
          <p>Max: <span>{formatTemperature(weather!.main.temp_min)}&deg;C</span></p>
          </div>
        </div>
      )}
    </>
  )
}
