export const TORONTO_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&current=temperature_2m,is_day,weather_code&hourly=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FToronto&temperature_unit=celsius&timeformat=unixtime&forecast_days=2';
export const WEATHER_CACHE_KEY = 'xiaoya-toronto-weather-v1';
export const WEATHER_REFRESH_MS = 15 * 60 * 1000;
export const WEATHER_CACHE_LIFETIME_MS = 60 * 60 * 1000;

export type WeatherIconName = 'sun' | 'moon' | 'cloud' | 'partly' | 'rain' | 'snow' | 'storm' | 'fog';
export interface WeatherHour { time: number; temperature: number; code: number; isDay: boolean }
export interface WeatherModel { updatedAt: number; temperature: number; code: number; isDay: boolean; high: number; low: number; hours: WeatherHour[] }
/** Raw Open-Meteo response plus when it was fetched; kept in localStorage for up to an hour. */
export interface CachedWeather { fetchedAt: number; data: unknown }

const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

export function weatherCondition(code: number, isDay = true): { label: string; icon: WeatherIconName } {
  if (code === 0) return { label: isDay ? 'Sunny' : 'Clear', icon: isDay ? 'sun' : 'moon' };
  if (code === 1) return { label: isDay ? 'Mostly sunny' : 'Mostly clear', icon: isDay ? 'partly' : 'moon' };
  if (code === 2) return { label: 'Partly cloudy', icon: isDay ? 'partly' : 'cloud' };
  if (code === 3) return { label: 'Cloudy', icon: 'cloud' };
  if ([45, 48].includes(code)) return { label: 'Fog', icon: 'fog' };
  if ([51, 53, 55].includes(code)) return { label: 'Drizzle', icon: 'rain' };
  if ([56, 57].includes(code)) return { label: 'Freezing drizzle', icon: 'rain' };
  if ([61, 63, 65].includes(code)) return { label: 'Rain', icon: 'rain' };
  if ([66, 67].includes(code)) return { label: 'Freezing rain', icon: 'rain' };
  if ([71, 73, 75, 77].includes(code)) return { label: 'Snow', icon: 'snow' };
  if ([80, 81, 82].includes(code)) return { label: 'Showers', icon: 'rain' };
  if ([85, 86].includes(code)) return { label: 'Snow showers', icon: 'snow' };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorms', icon: 'storm' };
  return { label: 'Conditions unavailable', icon: 'cloud' };
}

/** Validate an Open-Meteo response. Throws instead of guessing when anything is missing. */
export function readWeather(data: unknown): WeatherModel {
  const source = data as {
    current?: { time?: unknown; temperature_2m?: unknown; weather_code?: unknown; is_day?: unknown };
    daily?: { temperature_2m_max?: unknown[]; temperature_2m_min?: unknown[] };
    hourly?: { time?: unknown; temperature_2m?: unknown[]; weather_code?: unknown[]; is_day?: unknown[] };
  } | null;
  const current = source?.current;
  const high = source?.daily?.temperature_2m_max?.[0];
  const low = source?.daily?.temperature_2m_min?.[0];
  if (!current || !finite(current.time) || !finite(current.temperature_2m) || !finite(current.weather_code) || !finite(current.is_day) || !finite(high) || !finite(low)) {
    throw new Error('Incomplete weather data.');
  }
  const hourly = source!.hourly;
  if (!Array.isArray(hourly?.time)) throw new Error('Missing hourly forecast.');
  const now = current.time;
  const hours = (hourly!.time as unknown[]).map((time, index) => ({
    time, temperature: hourly!.temperature_2m?.[index], code: hourly!.weather_code?.[index], isDay: hourly!.is_day?.[index] === 1,
  })).filter((hour): hour is WeatherHour => finite(hour.time) && hour.time >= now && finite(hour.temperature) && finite(hour.code)).slice(0, 6);
  if (hours.length < 6) throw new Error('Incomplete hourly forecast.');
  return { updatedAt: current.time * 1000, temperature: current.temperature_2m, code: current.weather_code, isDay: current.is_day === 1, high, low, hours };
}
