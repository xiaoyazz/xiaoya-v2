import { useEffect, useState } from 'react';
import { formatMenuClock, type MenuClock } from '../lib/clock';

/** Toronto date/time, updated on each minute boundary and paused while the page is hidden. */
export function useTorontoClock(): MenuClock {
  const [clock, setClock] = useState(() => formatMenuClock());
  useEffect(() => {
    let timer = 0;
    let pageHidden = false;
    const clear = () => { clearTimeout(timer); timer = 0; };
    const update = () => {
      clear();
      const now = new Date();
      setClock(formatMenuClock(now));
      if (!pageHidden && document.visibilityState !== 'hidden') timer = window.setTimeout(update, 60000 - (now.getTime() % 60000));
    };
    const onVisibility = () => { if (document.visibilityState === 'hidden') clear(); else update(); };
    const onPageHide = () => { pageHidden = true; clear(); };
    const onPageShow = () => { pageHidden = false; update(); };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);
    update();
    return () => {
      clear();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);
  return clock;
}
