import { useEffect, useRef, useState } from 'react';
import { spotifyPlaylist } from '../../data/spotify';

const spotifyOrigin = 'https://open.spotify.com';
// After the iframe's load event, wait this long for the embed's "ready" message
// before showing the fallback card. Blocked or offline frames never send it.
const READY_TIMEOUT_MS = 4000;

/**
 * Official Spotify embed plus a glass fallback card. Renders inside the engine-owned
 * <section id="spotify-live-widget">; the iframe is never unmounted or moved, and the
 * fallback only covers it when the player can't load.
 */
export function SpotifyWidget({ host }: { host: HTMLElement }) {
  const iframe = useRef<HTMLIFrameElement>(null);
  const ready = useRef(false);
  const timer = useRef(0);
  const [state, setState] = useState<'loading' | 'ready' | 'unavailable'>('loading');

  useEffect(() => { host.dataset.spotifyState = state; }, [host, state]);
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== spotifyOrigin || event.source !== iframe.current?.contentWindow) return;
      if ((event.data as { type?: string } | null)?.type !== 'ready') return;
      ready.current = true; clearTimeout(timer.current); setState('ready');
    };
    window.addEventListener('message', onMessage);
    return () => { window.removeEventListener('message', onMessage); clearTimeout(timer.current); };
  }, []);

  const onLoad = () => {
    if (ready.current) return;
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { if (!ready.current) setState('unavailable'); }, READY_TIMEOUT_MS);
  };
  const unavailable = state === 'unavailable';
  return (
    <>
      <iframe
        ref={iframe}
        className="spotify-embed"
        src={spotifyPlaylist.embedUrl}
        title={`Spotify playlist preview: ${spotifyPlaylist.title}`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        aria-hidden={unavailable || undefined}
        tabIndex={unavailable ? -1 : undefined}
        onLoad={onLoad}
      />
      <div className="spotify-fallback" hidden={!unavailable}>
        <img className="spotify-fallback-icon" src="assets/icons/spotify-app.svg" alt="" width={56} height={56} draggable={false} />
        <div className="spotify-fallback-text">
          <p className="spotify-fallback-kind">Playlist</p>
          <h2 className="spotify-fallback-title">{spotifyPlaylist.title}</h2>
          <p className="spotify-fallback-note">The player couldn’t load here.</p>
          <a className="spotify-fallback-link" href={spotifyPlaylist.url} target="_blank" rel="noopener noreferrer">Open in Spotify ↗</a>
        </div>
      </div>
    </>
  );
}
