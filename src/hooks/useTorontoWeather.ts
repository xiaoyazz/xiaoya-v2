import { useCallback, useEffect, useRef, useState } from 'react';
import {
  readWeather, TORONTO_WEATHER_URL, WEATHER_CACHE_KEY, WEATHER_CACHE_LIFETIME_MS, WEATHER_REFRESH_MS,
  type CachedWeather, type WeatherModel,
} from '../lib/weather';

export type WeatherStatus =
  | { state: 'loading' }
  | { state: 'ready' | 'cached'; model: WeatherModel }
  | { state: 'error' };

function readCache(): CachedWeather | null {
  try {
    const cached = JSON.parse(window.localStorage.getItem(WEATHER_CACHE_KEY) || 'null') as CachedWeather | null;
    const age = cached && Number.isFinite(cached.fetchedAt) ? Date.now() - cached.fetchedAt : -1;
    if (cached && age >= 0 && age < WEATHER_CACHE_LIFETIME_MS) { readWeather(cached.data); return cached; }
  } catch { /* corrupt or unavailable cache */ }
  return null;
}

/**
 * Live Toronto weather from Open-Meteo, refreshed every 15 minutes.
 * Falls back to a forecast saved within the last hour (marked "Saved"), otherwise reports an error —
 * it never invents temperatures.
 */
export function useTorontoWeather(): { status: WeatherStatus; retry: () => void } {
  const lastGood = useRef<CachedWeather | null>(null);
  const [status, setStatus] = useState<WeatherStatus>(() => {
    const cached = readCache();
    lastGood.current = cached;
    return cached ? { state: 'cached', model: readWeather(cached.data) } : { state: 'loading' };
  });
  const inFlight = useRef(false);
  const paused = useRef(false);
  const request = useRef<AbortController | null>(null);
  const lastFetched = useRef(0);

  const refresh = useCallback(async () => {
    if (inFlight.current || paused.current) return;
    inFlight.current = true;
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await window.fetch(TORONTO_WEATHER_URL, { signal: controller.signal, credentials: 'omit', cache: 'no-store' });
      if (!response.ok) throw new Error('Weather request failed.');
      const data: unknown = await response.json();
      const model = readWeather(data);
      if (paused.current) return;
      lastFetched.current = Date.now();
      lastGood.current = { fetchedAt: lastFetched.current, data };
      setStatus({ state: 'ready', model });
      try { window.localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(lastGood.current)); } catch { /* storage blocked */ }
    } catch {
      if (paused.current) return;
      const saved = lastGood.current;
      if (saved && Date.now() - saved.fetchedAt < WEATHER_CACHE_LIFETIME_MS) setStatus({ state: 'cached', model: readWeather(saved.data) });
      else setStatus({ state: 'error' });
    } finally {
      clearTimeout(timeout); request.current = null; inFlight.current = false;
    }
  }, []);

  useEffect(() => {
    let interval = 0;
    const startUpdates = () => {
      clearInterval(interval);
      interval = window.setInterval(() => { if (!document.hidden) void refresh(); }, WEATHER_REFRESH_MS);
    };
    const onVisibility = () => { if (!document.hidden && Date.now() - lastFetched.current >= WEATHER_REFRESH_MS) void refresh(); };
    const onPageHide = () => { paused.current = true; clearInterval(interval); request.current?.abort(); };
    const onPageShow = () => {
      paused.current = false; startUpdates();
      setTimeout(() => { if (Date.now() - lastFetched.current >= WEATHER_REFRESH_MS) void refresh(); }, 0);
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);
    startUpdates(); void refresh();
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [refresh]);

  return { status, retry: () => void refresh() };
}
