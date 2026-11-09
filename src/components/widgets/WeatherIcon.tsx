import type { WeatherIconName } from '../../lib/weather';

const cloud = <path d="M7 17h10a4 4 0 0 0 .2-8 5.5 5.5 0 0 0-10.4-1A4.5 4.5 0 0 0 7 17Z" />;
const symbols: Record<WeatherIconName, JSX.Element> = {
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
  moon: <path d="M20 14a8.5 8.5 0 0 1-10-10A8.5 8.5 0 1 0 20 14Z" />,
  cloud,
  partly: <><path d="M8 2v2M2 8h2m-.3-4.3 1.4 1.4M12 3.7l-1.4 1.4M5 11a4 4 0 1 1 6-5" /><path d="M8 19h9a4 4 0 0 0 0-8 5 5 0 0 0-9.3-1A4.5 4.5 0 0 0 8 19Z" /></>,
  rain: <path d="M7 14h10a4 4 0 0 0 .2-8 5.5 5.5 0 0 0-10.4-1A4.5 4.5 0 0 0 7 14Zm1 3-1 3m6-3-1 4m6-4-1 3" />,
  snow: <path d="M7 14h10a4 4 0 0 0 .2-8 5.5 5.5 0 0 0-10.4-1A4.5 4.5 0 0 0 7 14ZM8 17v4m-2-2h4m6-2v4m-2-2h4" />,
  storm: <path d="M7 15H6a4.5 4.5 0 0 1 .8-9 5.5 5.5 0 0 1 10.4 1 4 4 0 0 1 1 7.8M13 12l-4 6h4l-2 5 6-8h-4l2-3" />,
  fog: <path d="M4 8h16M2 12h16M6 16h16M3 20h14" />,
};

export function WeatherIcon({ name }: { name: WeatherIconName }) {
  return (
    <svg className="weather-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {symbols[name] ?? cloud}
    </svg>
  );
}
