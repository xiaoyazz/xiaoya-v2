import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { galleryItems } from '../../data/gallery';

const chevron = (d: string) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d={d} /></svg>
);

/** My Photos window: an iOS-style grid of every photo; tapping one opens it full-size inside the window. */
export function PhotoLibrary() {
  const [open, setOpen] = useState<number | null>(null);
  const lastOpened = useRef<number | null>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const count = galleryItems.length;

  useEffect(() => {
    if (open !== null) backButton.current?.focus({ preventScroll: true });
    else if (lastOpened.current !== null) grid.current?.querySelectorAll<HTMLElement>('.library-thumb')[lastOpened.current]?.focus({ preventScroll: true });
  }, [open]);

  const show = (index: number) => { lastOpened.current = index; setOpen(index); };
  const step = (delta: number) => setOpen(current => current === null ? null : (current + delta + count) % count);
  const onViewerKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
    else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setOpen(null); } // back to the grid, keep the window open
  };

  if (open !== null) {
    const photo = galleryItems[open];
    return (
      <div className="library-viewer" onKeyDown={onViewerKey}>
        <img className="library-viewer-image" src={photo.src} alt={photo.title} draggable={false} />
        <button ref={backButton} className="library-glass library-back" type="button" onClick={() => setOpen(null)}>
          {chevron('M10 3 5 8l5 5')}<span>Library</span>
        </button>
        <span className="library-glass library-count" aria-live="polite">{open + 1} of {count}</span>
        <button className="library-glass library-step library-prev" type="button" aria-label="Previous photo" onClick={() => step(-1)}>{chevron('M10 3 5 8l5 5')}</button>
        <button className="library-glass library-step library-next" type="button" aria-label="Next photo" onClick={() => step(1)}>{chevron('m6 3 5 5-5 5')}</button>
      </div>
    );
  }

  return (
    <div className="library">
      <header className="library-header">
        <h2>Library</h2>
        <p>{count} photos</p>
      </header>
      <div className="library-grid" ref={grid}>
        {galleryItems.map((photo, index) => (
          <button className="library-thumb" type="button" key={photo.id} aria-label={`Open ${photo.title}`} onClick={() => show(index)}>
            <img src={photo.src} alt="" loading="lazy" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}
