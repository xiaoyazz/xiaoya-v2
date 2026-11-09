import { useLayoutEffect } from 'react';
import { useTorontoWeather } from '../../hooks/useTorontoWeather';
import { weatherCondition } from '../../lib/weather';
import { WeatherIcon } from './WeatherIcon';

const hourFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Toronto', hour: 'numeric', hour12: true });
const updateFormat = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Toronto', hour: 'numeric', minute: '2-digit', hour12: true });

/**
 * Renders inside the engine-owned <article class="weather-widget"> (`host`), so the
 * desktop engine can drag and re-parent it. State is mirrored onto the host for CSS.
 */
export function WeatherWidget({ host }: { host: HTMLElement }) {
  const { status, retry } = useTorontoWeather();
  const model = status.state === 'ready' || status.state === 'cached' ? status.model : null;

  useLayoutEffect(() => {
    host.dataset.weatherState = status.state;
    host.setAttribute('aria-busy', String(status.state === 'loading'));
    if (model) host.dataset.weatherPeriod = model.isDay ? 'day' : 'night';
  }, [host, status.state, model]);

  const condition = model ? weatherCondition(model.code, model.isDay) : null;
  return (
    <>
      <h2 className="weather-city">
        Toronto <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 7 10-4-4 10-2-4-4-2Z" fill="currentColor" /></svg>
      </h2>
      <div className="weather-content">
        {status.state === 'loading' && <p className="weather-message">Loading weather…</p>}
        {status.state === 'error' && (
          <>
            <div className="weather-error" role="status">
              <WeatherIcon name="cloud" />
              <div>
                <p className="weather-error-title">Weather unavailable</p>
                <p className="weather-error-note">Check your connection and try again.</p>
              </div>
            </div>
            <button className="weather-retry" type="button" onClick={retry}>Retry</button>
          </>
        )}
        {model && condition && (
          <>
            <div className="weather-now">
              <div className="weather-current-temperature">
                <span className="weather-temperature">{Math.round(model.temperature)}°</span><span className="weather-unit">C</span>
              </div>
              <div className="weather-details">
                <div className="weather-condition"><WeatherIcon name={condition.icon} /><span>{condition.label}</span></div>
                <div className="weather-range">H:{Math.round(model.high)}° L:{Math.round(model.low)}°</div>
              </div>
            </div>
            <ol className="weather-hours" aria-label="Next six hours in Toronto">
              {model.hours.map(hour => {
                const forecast = weatherCondition(hour.code, hour.isDay);
                const date = new Date(hour.time * 1000);
                return (
                  <li key={hour.time}>
                    <time dateTime={date.toISOString()}>{hourFormat.format(date).replace(/\s/g, '')}</time>
                    <WeatherIcon name={forecast.icon} />
                    <span className="sr-only">{forecast.label}, </span>
                    <strong>{Math.round(hour.temperature)}°</strong>
                  </li>
                );
              })}
            </ol>
          </>
        )}
      </div>
      <footer className="weather-footer">
        <span className="weather-updated" title={model ? 'Toronto time' : undefined}>
          {model ? `${status.state === 'cached' ? 'Saved' : 'Updated'} ${updateFormat.format(new Date(model.updatedAt))}` : ''}
        </span>
        <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" aria-label="Weather data by Open-Meteo">Open-Meteo ↗</a>
      </footer>
    </>
  );
}
