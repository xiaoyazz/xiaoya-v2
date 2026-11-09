import type { GalleryItem } from '../data/types';

const escape = (value: unknown) => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
const arrow = (direction: 'previous' | 'next') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${direction === 'previous' ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'}"/></svg>`;

export interface GalleryController { setVisible(value: boolean): void; destroy(): void }
export type GalleryRoot = HTMLElement & { galleryController: GalleryController };

// Photos carousel: advances upward every 4 s while visible; reduced motion swaps images instantly.
export function createProjectGallery(items: GalleryItem[], { onInteract = () => {}, onOpenLibrary = () => {} }: { onInteract?: () => void; onOpenLibrary?: () => void } = {}): GalleryRoot {
  const root = document.createElement('section') as GalleryRoot;
  root.className = 'project-gallery';
  root.tabIndex = 0;
  root.dataset.galleryView = 'photo';
  root.setAttribute('aria-label', 'Photo carousel');
  root.setAttribute('aria-roledescription', 'carousel');
  root.innerHTML = `<div class="gallery-shell"><div class="gallery-toolbar"><button class="gallery-round-button" data-gallery-action="previous" aria-label="Previous photo">${arrow('previous')}</button><div class="gallery-heading"><strong></strong><span class="gallery-subtitle"></span></div><button class="gallery-round-button" data-gallery-action="next" aria-label="Next photo">${arrow('next')}</button></div><div class="gallery-main"><button class="gallery-stage" type="button" data-gallery-action="open-library" aria-label="Open photo library" title="Open photo library"></button></div><div class="gallery-dots" aria-hidden="true">${items.map(() => '<span></span>').join('')}</div></div><span class="gallery-announcement sr-only" aria-live="polite"></span>`;
  const stage = root.querySelector<HTMLButtonElement>('.gallery-stage')!;
  const live = root.querySelector<HTMLElement>('.gallery-announcement')!;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let index = 0;
  let visible = false;
  let disposed = false;
  let playTimer = 0;
  let transitionTimer = 0;
  let animationFrame = 0;
  let generation = 0;
  let prepared: { index: number; image: HTMLImageElement; ready: Promise<boolean> } | null = null;
  const canPlay = () => !disposed && visible && items.length > 1 && !document.hidden;

  function cancelMotion() {
    clearTimeout(playTimer); clearTimeout(transitionTimer); cancelAnimationFrame(animationFrame);
    playTimer = 0; transitionTimer = 0; animationFrame = 0; generation += 1;
    root.dataset.galleryTransition = 'idle';
    const current = stage.querySelector<HTMLElement>('.gallery-slide-current');
    if (current) current.style.transition = 'none';
    stage.classList.remove('is-scrolling');
    stage.querySelector('.gallery-slide-next')?.remove();
  }
  function scheduleNext() {
    root.dataset.galleryPlayback = canPlay() ? 'playing' : 'paused';
    if (canPlay()) playTimer = window.setTimeout(advanceAutomatically, 4000);
  }
  function syncPlayback() { cancelMotion(); scheduleNext(); }
  function preloadNext() {
    const next = (index + 1) % items.length;
    const image = new Image();
    image.src = items[next].src;
    const ready = typeof image.decode === 'function' ? Promise.resolve().then(() => image.decode()).then(() => true, () => false) : Promise.resolve(true);
    prepared = { index: next, image, ready };
  }
  function showImage(next: number, { announce = false } = {}) {
    cancelMotion();
    index = (next % items.length + items.length) % items.length;
    const item = items[index];
    root.dataset.galleryIndex = String(index);
    stage.innerHTML = `<div class="gallery-slide gallery-slide-current"><img class="gallery-image" src="${escape(item.src)}" alt="${escape(item.title)}" draggable="false"></div>`;
    root.querySelector('.gallery-heading strong')!.textContent = item.title;
    root.querySelector('.gallery-subtitle')!.textContent = `${index + 1} of ${items.length}`;
    root.querySelectorAll('.gallery-dots span').forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    if (announce) live.textContent = `${item.title}, ${index + 1} of ${items.length}`;
    preloadNext(); scheduleNext();
  }
  function advanceAutomatically() {
    playTimer = 0;
    if (!canPlay()) return;
    const token = generation;
    const next = (index + 1) % items.length;
    const ready = prepared?.index === next ? prepared.ready : Promise.resolve(true);
    void ready.then(loaded => {
      if (token !== generation || !canPlay()) return;
      if (!loaded) { preloadNext(); syncPlayback(); return; }
      if (reducedMotion?.matches) { showImage(next); return; }
      const incoming = document.createElement('div');
      incoming.className = 'gallery-slide gallery-slide-next';
      incoming.setAttribute('aria-hidden', 'true');
      incoming.innerHTML = `<img class="gallery-image" src="${escape(items[next].src)}" alt="" draggable="false">`;
      stage.append(incoming);
      const current = stage.querySelector<HTMLElement>('.gallery-slide-current');
      if (current) current.style.transition = '';
      void stage.offsetHeight;
      animationFrame = requestAnimationFrame(() => {
        if (token !== generation || !canPlay()) return;
        root.dataset.galleryTransition = 'up'; stage.classList.add('is-scrolling');
        transitionTimer = window.setTimeout(() => {
          transitionTimer = 0;
          if (token === generation && canPlay()) showImage(next);
        }, 450);
      });
    });
  }
  function onClick(event: MouseEvent) {
    if (disposed) return;
    const target = event.target as Element;
    const button = target.closest<HTMLElement>('[data-gallery-action]');
    if (!button || !root.contains(button)) return;
    const action = button.dataset.galleryAction;
    // Stop here so the desktop's window click handler doesn't pull Photos back in front of the library.
    if (action === 'open-library') { event.stopPropagation(); onOpenLibrary(); return; }
    if (action !== 'previous' && action !== 'next') return;
    onInteract(); showImage(index + (action === 'next' ? 1 : -1), { announce: true });
  }
  function onKeydown(event: KeyboardEvent) {
    if (disposed || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); event.stopPropagation(); onInteract();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : index + (event.key === 'ArrowRight' ? 1 : -1);
    showImage(next, { announce: true });
  }
  root.addEventListener('click', onClick);
  root.addEventListener('keydown', onKeydown);
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion?.addEventListener?.('change', syncPlayback);
  root.galleryController = {
    setVisible(value) {
      if (disposed || visible === Boolean(value)) return;
      visible = Boolean(value); syncPlayback();
    },
    destroy() {
      disposed = true; visible = false; cancelMotion();
      root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKeydown);
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion?.removeEventListener?.('change', syncPlayback);
    },
  };
  showImage(0);
  return root;
}
