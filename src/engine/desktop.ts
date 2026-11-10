/**
 * Desktop engine: icon layout and dragging, windows, the Photos carousel window, the
 * compact (≤1139px) app grid, Restart, and the dodging Trash.
 *
 * Ported from the original vanilla prototype with the same behavior. React renders the
 * page shell (App.tsx), the widgets, and window content; this module owns the DOM inside
 * #desktop and #windows and mounts those React pieces into elements it manages.
 */
import type { Root } from 'react-dom/client';
import { galleryItems } from '../data/gallery';
import { spotifyPlaylist } from '../data/spotify';
import { projects } from '../data/projects';
import { techStack as techItems } from '../data/techStack';
import { initAiTools } from './aiTools';
import { createProjectGallery, type GalleryRoot } from './gallery';
import { boundPosition, clamp, emptyLayout, readLayout, toPixels, toRatios, type Point, type Rect, type Size } from './layout';
import { mountInto, renderNow } from './mount';
import { messageGreeting as messageGreetingContent, spotifyWidget, weatherWidget, windowContent } from './reactParts';
import { createDodgingTrash, type TrashController } from './trash';
import { initWidgetDragging, type WidgetDragDetail, type WidgetDragging } from './widgetDrag';
import { avoidWidgetOverlap } from './widgetLayout';

type ItemKind = 'folder' | 'document' | 'app' | 'profile' | 'gallery' | 'photo' | 'library';
interface DesktopItem {
  id: string;
  label: string;
  kind: ItemKind;
  icon?: string;
  /** Default position as [x ratio of width (icon centre), y ratio of height]. */
  position?: [number, number];
}
interface WindowState {
  key: string;
  item: DesktopItem;
  el: HTMLElement;
  opener: HTMLElement | null;
  originWindow: HTMLElement | null;
  bounds: Rect;
  maximized: boolean;
  minimized: boolean;
  createdCompact: boolean;
  responsiveSuspended?: boolean;
  desktopBounds?: Rect;
  previousBounds?: Rect;
  /** Set once the visitor drags or nudges the window; until then it follows the screen size like the widgets. */
  userPlaced?: boolean;
  /** Project to return to with the folder window's Forward button. */
  forward?: string;
  galleryRoot?: GalleryRoot;
  contentRoot?: Root;
}
interface DragState { type: 'item' | 'window'; id: string; el: HTMLElement; pointerId: number; start: Point; origin: Point; moved: boolean }

const storageKey = 'xiaoya-desktop-layout-v1';
const galleryPreferenceKey = 'xiaoya-project-gallery-v1';
const messagePreferenceKey = 'xiaoya-message-greeting-v1';
const COMPACT_MAX_WIDTH = 1139;

const escape = (value: unknown) => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const asset = (file: string) => `assets/${file.split('/').map(encodeURIComponent).join('/')}`;

const profileItem: DesktopItem = { id: 'about', label: 'About Xiaoya', kind: 'profile' };
const galleryItem: DesktopItem = { id: 'gallery', label: 'Photos', kind: 'gallery' };
// Not 'library': that id belongs to the Library project.
const libraryItem: DesktopItem = { id: 'photo-library', label: 'Photos', kind: 'library', icon: 'icons/photos-app.svg' };
const folders: DesktopItem[] = [
  { id: 'projects', label: 'Projects', icon: 'icons/folder-blue.svg', kind: 'folder', position: [.335, .627] },
];
const catalog: DesktopItem[] = [...folders,
  { id: 'hello', label: 'RESUME.txt', kind: 'document', icon: 'icons/document.svg', position: [.188, .773] },
  { id: 'photos', label: 'Photos', kind: 'app', icon: 'icons/photos-app.svg', position: [.725, .48] },
  { id: 'messages', label: 'Messages', kind: 'app', icon: 'icons/messages-app.svg', position: [.403, .327] },
  { id: 'terminal', label: 'Terminal', kind: 'app', icon: 'icons/terminal.svg', position: [.622, .43] },
  { id: 'techstack', label: 'Tech Stack', kind: 'app', position: [.5, .8] },
  { id: 'trash', label: 'Trash', kind: 'app', icon: 'icons/trash.svg', position: [.64, .64] },
];
/** App order on the compact home screen. */
const mobileOrder = ['terminal', 'projects', 'hello', 'photos', 'techstack', 'messages', 'trash']; // Trash is desktop-only; the Tech Stack folder is compact-only.
const projectItems: DesktopItem[] = projects.map(project => ({ id: project.id, label: project.image, kind: 'photo' }));
const itemFor = (id: string): DesktopItem | undefined =>
  id === 'about' ? profileItem : id === 'gallery' ? galleryItem : id === 'photo-library' ? libraryItem : catalog.find(item => item.id === id) || projectItems.find(item => item.id === id);
const catalogItem = (id: string) => catalog.find(item => item.id === id)!;

let started = false;

export function startDesktop(): void {
  if (started) return;
  started = true;

  const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  const workspace = $('workspace');
  const desktop = $('desktop');
  const windowsLayer = $('windows');
  const tray = $('minimized');
  const announcement = $('announcement');
  const toolbar = document.querySelector<HTMLElement>('.desktop-bar')!;
  const appMenuToggle = $<HTMLButtonElement>('app-menu-toggle');
  const appMenu = $('app-menu');
  const menuPairs: [HTMLElement, HTMLElement][] = [[appMenuToggle, appMenu]];

  let storage: Storage | null;
  try { storage = window.localStorage; } catch { storage = null; }
  let saved = readLayout(storage, storageKey);
  let galleryDismissed = false;
  let messageDismissed = false;
  // Messages and Photos always start open; closing them only lasts until the next page load.
  // Clear the old saved "closed" flags from earlier versions of the site.
  try { storage?.removeItem(galleryPreferenceKey); storage?.removeItem(messagePreferenceKey); } catch { /* ignore */ }

  let photosLauncher!: HTMLElement;
  let messagesLauncher!: HTMLElement;
  let messageGreeting!: HTMLElement;
  const elements = new Map<string, HTMLElement>();
  const positions = new Map<string, Point>();
  const openWindows = new Map<string, WindowState>();
  let iconZ = 1;
  let windowZ = 1;
  let serial = 0;
  let activeWindow: string | null = null;
  let drag: DragState | null = null;
  const suppressed = new Map<string, number>();
  let layoutFrame = 0;
  let viewportFrame = 0;
  let widgetStack!: HTMLElement;
  let widgetDragging: WidgetDragging | null = null;
  let responsiveMode: boolean | null = null;
  let trashController: TrashController | null = null;
  let escapedTrashPosition: Point | null = null;

  const board = (): Size => ({ width: desktop.clientWidth, height: desktop.clientHeight });
  const isCompact = () => desktop.clientWidth <= COMPACT_MAX_WIDTH;
  const mode = () => isCompact() ? 'mobile' as const : 'desktop' as const;
  const sizeOf = (el: HTMLElement): Size => ({
    width: el.offsetWidth || (el.classList.contains('folder') || el.classList.contains('app') ? 124 : 148),
    height: el.offsetHeight || (el.classList.contains('app') ? 124 : 140),
  });
  const announce = (message: string) => { announcement.textContent = message; };
  const visibleWindows = () => [...openWindows.values()].filter(item => !item.minimized && !item.responsiveSuspended).sort((a, b) => Number(a.el.style.zIndex) - Number(b.el.style.zIndex));

  // ---- Menu bar --------------------------------------------------------------------------
  function closeMenus(restore = false): boolean {
    let opener: HTMLElement | null = null;
    for (const [toggle, popup] of menuPairs) {
      if (!popup.hidden) opener = toggle;
      popup.hidden = true; toggle.setAttribute('aria-expanded', 'false');
    }
    if (restore) opener?.focus({ preventScroll: true });
    return Boolean(opener);
  }
  function toggleMenu(toggle: HTMLElement, popup: HTMLElement) {
    const opening = popup.hidden; closeMenus();
    if (opening) { popup.hidden = false; toggle.setAttribute('aria-expanded', 'true'); }
  }

  // ---- Desktop icons ---------------------------------------------------------------------
  function defaultPosition(item: DesktopItem): Point {
    const dimensions = board();
    const size = sizeOf(elements.get(item.id)!);
    return { x: dimensions.width * item.position![0] - size.width / 2, y: dimensions.height * item.position![1] };
  }
  function dodgeTrash({ x, y, draggedRect, force = false, id }: { x: number; y: number; draggedRect?: Rect | null; force?: boolean; id: string }) {
    if (id === 'trash' || isCompact()) return;
    trashController?.evade({ x, y, draggedRect, force });
  }
  function dodgeTrashForDrag(event: PointerEvent, finished: DragState | null = drag, force = false) {
    if (!finished || finished.id === 'trash') return;
    const origin = workspace.getBoundingClientRect();
    const draggedRect = finished.type === 'item' ? { ...positions.get(finished.id)!, ...sizeOf(finished.el) } : openWindows.get(finished.id)?.bounds;
    dodgeTrash({ x: event.clientX - origin.left, y: event.clientY - origin.top, draggedRect, force, id: finished.id });
  }
  function syncDesktopIcons() {
    const compact = isCompact();
    const gallery = openWindows.get('gallery');
    const collapsed = gallery ? gallery.minimized : galleryDismissed;
    for (const item of catalog) {
      const el = elements.get(item.id)!;
      el.hidden = item.id === 'trash' ? compact : item.id === 'techstack' ? !compact : item.id === 'photos' ? !compact && !collapsed : item.id === 'messages' ? !messageDismissed : false;
      el.style.order = String(mobileOrder.indexOf(item.id));
    }
  }
  // ---- Tech Stack app folder (compact home screen) ------------------------------------------
  const techSection = document.querySelector<HTMLElement>('.tech-stack')!;
  const techGroupOpen = () => document.documentElement.classList.contains('tech-group-open');
  function openTechGroup() {
    if (!isCompact()) return;
    document.documentElement.classList.add('tech-group-open');
    techSection.setAttribute('role', 'dialog'); techSection.setAttribute('aria-modal', 'true');
    syncCompactAppState();
    techSection.querySelector<HTMLElement>('.tech-app')?.focus({ preventScroll: true });
  }
  function closeTechGroup({ focus = true } = {}) {
    if (!techGroupOpen()) return;
    document.documentElement.classList.remove('tech-group-open');
    techSection.removeAttribute('role'); techSection.removeAttribute('aria-modal');
    syncCompactAppState();
    if (focus) elements.get('techstack')?.focus({ preventScroll: true });
  }
  // Tapping the blurred backdrop (anything outside the panel and the AI Tools popover) closes the folder.
  techSection.addEventListener('click', event => {
    if (techGroupOpen() && !(event.target as Element).closest('.tech-dock, .ai-tools-popover')) closeTechGroup();
  });
  function syncCompactAppState() {
    const opened = isCompact() && (techGroupOpen() || [...openWindows.values()].some(state => !state.minimized && !state.responsiveSuspended && !state.el.hidden));
    document.documentElement.classList.toggle('compact-app-open', opened);
    desktop.inert = opened;
    if (opened) desktop.setAttribute('aria-hidden', 'true'); else desktop.removeAttribute('aria-hidden');
  }

  function syncResponsiveMode() {
    const compact = isCompact();
    document.documentElement.classList.toggle('compact-desktop', compact);
    if (responsiveMode !== compact) {
      const previous = responsiveMode; responsiveMode = compact;
      if (compact) {
        if (drag) {
          const finished = drag; drag = null; finished.el.classList.remove('is-dragging');
          if (finished.el.hasPointerCapture?.(finished.pointerId)) finished.el.releasePointerCapture(finished.pointerId);
        }
        widgetDragging?.cancel();
        for (const state of openWindows.values()) {
          if (previous === false) state.desktopBounds = { ...state.bounds };
          if (!state.minimized) { state.responsiveSuspended = true; state.el.hidden = true; state.el.setAttribute('aria-hidden', 'true'); state.galleryRoot?.galleryController.setVisible(false); }
        }
        activeWindow = null;
      } else {
        closeTechGroup({ focus: false });
        for (const state of openWindows.values()) {
          state.el.removeAttribute('aria-modal');
          if (state.desktopBounds) { setWindowBounds(state, state.desktopBounds); delete state.desktopBounds; }
          else if (state.createdCompact) setWindowBounds(state, defaultWindowBounds(state.item));
          state.createdCompact = false;
          if (state.responsiveSuspended) { state.responsiveSuspended = false; if (!state.minimized) bringForward(state); }
        }
        if (previous === true && !galleryDismissed && !openWindows.has('gallery')) openItem('gallery', appMenuToggle, { focus: false });
      }
    }
    syncDesktopIcons(); syncCompactAppState();
  }

  // ---- Positions and layout ----------------------------------------------------------------
  function place(id: string, position: Point): Point {
    const el = elements.get(id)!;
    const safe = boundPosition(position, board(), sizeOf(el));
    safe.y = Math.max(safe.y, toolbar.getBoundingClientRect().height + 12);
    positions.set(id, safe);
    el.style.transform = `translate3d(${safe.x}px,${safe.y}px,0)`;
    return safe;
  }
  function savePosition(id: string) {
    saved[mode()][id] = toRatios(positions.get(id)!, board(), sizeOf(elements.get(id)!));
    try { storage?.setItem(storageKey, JSON.stringify(saved)); } catch { /* ignore */ }
  }
  function select(id: string | null) {
    elements.forEach((el, key) => el.classList.toggle('is-selected', key === id));
    if (id) {
      if (iconZ >= 150) { elements.forEach(el => { el.style.zIndex = '1'; }); iconZ = 2; } else iconZ += 1;
      elements.get(id)!.style.zIndex = String(iconZ);
    }
  }
  function renderDesktop() {
    desktop.innerHTML = [...catalog].sort((a, b) => mobileOrder.indexOf(a.id) - mobileOrder.indexOf(b.id)).map(item => {
      const toggle = item.id === 'photos' ? ` id="photos-desktop-toggle"${galleryDismissed ? '' : ' hidden'}` : item.id === 'messages' ? ` id="messages-desktop-toggle"${messageDismissed ? '' : ' hidden'}` : '';
      const label = item.id === 'trash' ? 'Trash' : `Open ${escape(item.label)}`;
      const art = item.id === 'techstack'
        ? `<span class="icon-art app-group-icon" aria-hidden="true">${techItems.slice(0, 9).map(tech => `<span class="app-group-mini${tech.className ? ` ${tech.className}` : ''}"><img src="assets/tech/${encodeURIComponent(tech.icon)}" alt="" draggable="false"></span>`).join('')}</span>`
        : `<img class="icon-art" src="${asset(item.icon!)}" alt="" draggable="false">`;
      const title = `${escape(item.label)}${item.id === 'trash' ? '' : ` — click to open${isCompact() ? '' : ', drag to move'}`}`;
      return `<button class="desktop-item ${item.kind}${item.id === 'trash' ? ' trash' : ''}"${toggle} data-item="${item.id}" aria-label="${label}" title="${title}">${art}<span class="file-label">${escape(item.label)}</span></button>`;
    }).join('');
    for (const el of desktop.querySelectorAll<HTMLElement>('[data-item]')) elements.set(el.dataset.item!, el);
    photosLauncher = elements.get('photos')!;
    messagesLauncher = elements.get('messages')!;
    syncDesktopIcons();
  }

  // ---- Messages, Weather, Spotify ------------------------------------------------------------
  function closeMessageGreeting() {
    widgetDragging?.cancel('messages');
    messageDismissed = true; messageGreeting.hidden = true; messagesLauncher.hidden = false;
    workspace.classList.remove('has-message-greeting');
    scheduleLayout(); messagesLauncher.focus({ preventScroll: true });
    announce('Greeting closed. Open Messages on the desktop to read it again.');
  }
  function openMessageGreeting({ focus = false } = {}) {
    messageDismissed = false; messageGreeting.hidden = false; messagesLauncher.hidden = true;
    workspace.classList.add('has-message-greeting');
    scheduleLayout();
    if (focus) messageGreeting.querySelector<HTMLElement>('[data-message-close]')!.focus({ preventScroll: true });
  }
  function renderWidgets() {
    widgetStack = document.createElement('div');
    widgetStack.className = 'desktop-widgets';

    const weather = document.createElement('article');
    weather.className = 'weather-widget';
    weather.dataset.weatherState = 'loading';
    weather.setAttribute('aria-label', 'Toronto weather');
    weather.setAttribute('aria-busy', 'true');
    mountInto(weather, weatherWidget(weather));
    widgetStack.append(weather);

    const spotify = document.createElement('section');
    spotify.className = 'spotify-widget';
    spotify.id = 'spotify-live-widget';
    spotify.dataset.spotifyState = 'loading';
    spotify.setAttribute('aria-label', `${spotifyPlaylist.title} on Spotify`);
    mountInto(spotify, spotifyWidget(spotify));
    widgetStack.append(spotify);
    // On the compact home screen the player renders at its full 352px size and is scaled to fit the square tile.
    const syncSpotifyScale = () => spotify.style.setProperty('--embed-scale', String(spotify.clientWidth / 352 || 1));
    if ('ResizeObserver' in window) new ResizeObserver(syncSpotifyScale).observe(spotify); else syncSpotifyScale();

    messageGreeting = document.createElement('section');
    messageGreeting.id = 'message-greeting';
    messageGreeting.className = 'message-greeting';
    messageGreeting.setAttribute('role', 'region');
    messageGreeting.setAttribute('aria-labelledby', 'message-sender');
    messageGreeting.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeMessageGreeting(); }
    });
    mountInto(messageGreeting, messageGreetingContent(closeMessageGreeting));
    messageGreeting.hidden = messageDismissed;
    workspace.classList.toggle('has-message-greeting', !messageDismissed);
    widgetStack.append(messageGreeting);
    workspace.insertBefore(widgetStack, windowsLayer);
  }
  function layout() {
    syncResponsiveMode();
    if (isCompact()) {
      for (const state of openWindows.values()) if (!state.minimized && !state.responsiveSuspended) revealWindow(state);
      return;
    }
    for (const item of catalog) {
      const ratios = saved[mode()][item.id];
      place(item.id, item.id === 'trash' && escapedTrashPosition ? escapedTrashPosition : ratios ? toPixels(ratios, board(), sizeOf(elements.get(item.id)!)) : defaultPosition(item));
    }
    const reserved = {
      x: widgetStack.offsetLeft || (mode() === 'mobile' ? 12 : 24),
      y: widgetStack.offsetTop || 72,
      width: widgetStack.offsetWidth || Math.min(304, board().width - (mode() === 'mobile' ? 24 : 48)),
      height: widgetStack.offsetHeight || 352,
    };
    const rectangles = catalog.filter(item => !elements.get(item.id)!.hidden).map(item => ({
      id: item.id,
      locked: Boolean(saved[mode()][item.id]) || item.id === 'trash' && Boolean(escapedTrashPosition),
      ...positions.get(item.id)!, ...sizeOf(elements.get(item.id)!),
    }));
    const limits = { ...board(), minY: toolbar.getBoundingClientRect().height + 12 };
    for (const [id, position] of avoidWidgetOverlap(rectangles, reserved, limits)) {
      place(id, position); Object.assign(rectangles.find(rect => rect.id === id)!, position);
    }
    // The Messages card floats outside the widget column, so icons step around it separately.
    if (!messageGreeting.hidden) {
      const card = messageGreeting.getBoundingClientRect(), origin = desktop.getBoundingClientRect();
      const messageRect = { x: card.left - origin.left, y: card.top - origin.top, width: card.width, height: card.height };
      const obstacles = [...rectangles, { id: '__widget-column', locked: true, ...reserved }];
      for (const [id, position] of avoidWidgetOverlap(obstacles, messageRect, limits)) place(id, position);
    }
    // Photos keeps its proportional spot (and default size) as the screen resizes, unless the visitor moved it.
    for (const state of openWindows.values()) {
      if (state.item.kind === 'gallery' && !state.userPlaced && !state.maximized && !state.minimized) state.bounds = defaultWindowBounds(state.item);
      revealWindow(state);
    }
    widgetDragging?.layout();
  }
  function scheduleLayout() { cancelAnimationFrame(layoutFrame); layoutFrame = requestAnimationFrame(layout); }

  // ---- Windows -----------------------------------------------------------------------------
  function visibleArea(): Rect {
    const bounds = workspace.getBoundingClientRect();
    const menuBottom = toolbar.getBoundingClientRect().bottom;
    const top = clamp(Math.max(0, menuBottom - bounds.top) + 12, 12, board().height - 260);
    const bottom = Math.min(board().height - 12, window.innerHeight - bounds.top - 12);
    return { x: 12, y: top, width: Math.max(260, board().width - 24), height: Math.max(260, bottom - top) };
  }
  // ---- "More below" chevron for the Projects window ----------------------------------------------
  function syncScrollHint(state: WindowState) {
    const content = state.el.querySelector<HTMLElement>('.window-content');
    const hint = state.el.querySelector<HTMLElement>('.scroll-hint');
    if (!content || !hint) return;
    hint.hidden = state.key !== 'projects' || content.scrollHeight - content.clientHeight - content.scrollTop <= 12;
    if (!hint.hidden) hint.style.left = `${content.offsetLeft + content.clientWidth / 2}px`; // centre over the content, not the sidebar
  }
  function watchScrollHint(state: WindowState) {
    const content = state.el.querySelector<HTMLElement>('.window-content')!;
    const sync = () => syncScrollHint(state);
    content.addEventListener('scroll', sync, { passive: true });
    content.addEventListener('load', sync, true); // screenshots finishing loading change the height
    if ('ResizeObserver' in window) new ResizeObserver(sync).observe(content);
    state.el.querySelector('.scroll-hint')!.addEventListener('click', () => {
      content.scrollBy({ top: Math.max(120, content.clientHeight * .75), behavior: 'smooth' });
    });
  }
  function setWindowBounds(state: WindowState, bounds: Rect) {
    const dimensions = board();
    const width = clamp(bounds.width, 260, dimensions.width - 16);
    const height = clamp(bounds.height, 250, dimensions.height - 16);
    const position = boundPosition(bounds, dimensions, { width, height }, 8);
    state.bounds = { ...position, width, height };
    Object.assign(state.el.style, { left: `${position.x}px`, top: `${position.y}px`, width: `${width}px`, height: `${height}px` });
  }
  function setMaximizedBounds(state: WindowState) { const area = visibleArea(); setWindowBounds(state, { ...area, width: board().width - 24, height: area.height }); }
  function revealWindow(state: WindowState) {
    if (state.maximized) { setMaximizedBounds(state); return; }
    const area = visibleArea();
    const width = Math.min(state.bounds.width, area.width); const height = Math.min(state.bounds.height, area.height);
    setWindowBounds(state, { width, height, x: clamp(state.bounds.x, area.x, area.x + area.width - width), y: clamp(state.bounds.y, area.y, area.y + area.height - height) });
  }
  function bringForward(state: WindowState, focus = false) {
    state.responsiveSuspended = false;
    if (isCompact()) state.el.setAttribute('aria-modal', 'true'); else state.el.removeAttribute('aria-modal');
    state.minimized = false; state.el.hidden = false; state.el.removeAttribute('aria-hidden');
    state.galleryRoot?.galleryController.setVisible(true);
    state.el.style.zIndex = String(++windowZ);
    activeWindow = state.key;
    for (const item of openWindows.values()) item.el.classList.toggle('is-inactive', item !== state);
    updateTray();
    if (focus) state.el.querySelector<HTMLElement>('.window-header')!.focus({ preventScroll: true });
  }
  // ---- Dimmed backdrop while an app/folder window is open --------------------------------------
  // Any open window (other than the Photos widget window) dims the desktop behind it, and the
  // Photos window steps out of the way unless it's the one the visitor brought to the front.
  const windowBackdrop = document.createElement('div');
  windowBackdrop.className = 'window-backdrop'; windowBackdrop.hidden = true;
  windowsLayer.prepend(windowBackdrop);
  function syncWindowFocusMode() {
    const others = [...openWindows.values()].filter(state => state.item.kind !== 'gallery' && !state.minimized && !state.responsiveSuspended);
    windowBackdrop.hidden = others.length === 0;
    const gallery = openWindows.get('gallery');
    if (!gallery || gallery.minimized || gallery.responsiveSuspended) return;
    const covered = others.length > 0 && activeWindow !== 'gallery';
    gallery.el.hidden = covered;
    if (covered) gallery.el.setAttribute('aria-hidden', 'true'); else gallery.el.removeAttribute('aria-hidden');
    gallery.galleryRoot?.galleryController.setVisible(!covered);
  }
  function updateTray() {
    tray.innerHTML = [...openWindows.values()].filter(state => state.minimized && state.item.kind !== 'gallery')
      .map(state => `<button data-restore="${state.key}" aria-label="Restore ${escape(state.item.label)}">${escape(state.item.label)}</button>`).join('');
    const wasHidden = photosLauncher.hidden;
    syncWindowFocusMode();
    syncDesktopIcons(); syncCompactAppState();
    if (photosLauncher.hidden !== wasHidden) scheduleLayout();
  }
  function restoreFocus(state: WindowState) {
    const opener = state.opener?.isConnected && !state.opener.closest('.desktop-window[hidden]') ? state.opener : null;
    const origin = state.originWindow?.isConnected && !state.originWindow.hidden ? state.originWindow.querySelector<HTMLElement>('.window-header') : null;
    (opener || origin || elements.get(state.item.id) || elements.get('projects'))?.focus({ preventScroll: true });
  }
  function cancelWindowDrag(state: WindowState) {
    if (drag?.type === 'window' && drag.id === state.key) {
      const finished = drag; drag = null; finished.el.classList.remove('is-dragging');
      if (finished.el.hasPointerCapture?.(finished.pointerId)) finished.el.releasePointerCapture(finished.pointerId);
    }
  }
  function collapseGallery(state: WindowState) {
    cancelWindowDrag(state);
    state.galleryRoot?.galleryController.setVisible(false);
    galleryDismissed = true;
    state.minimized = true; state.el.hidden = true; state.el.setAttribute('aria-hidden', 'true');
    activeWindow = null;
    const remaining = visibleWindows();
    if (remaining.length) bringForward(remaining.at(-1)!);
    updateTray(); photosLauncher.focus({ preventScroll: true });
    announce('Photos collapsed to the Photos icon on the desktop.');
  }
  function closeWindow(state: WindowState | undefined) {
    if (!state) return;
    if (state.item.kind === 'gallery') { collapseGallery(state); return; }
    state.galleryRoot?.galleryController.destroy();
    cancelWindowDrag(state);
    state.contentRoot?.unmount();
    state.el.remove(); openWindows.delete(state.key); updateTray();
    activeWindow = null;
    const remaining = visibleWindows();
    if (remaining.length) bringForward(remaining.at(-1)!);
    restoreFocus(state);
    announce(`${state.item.label} closed.`);
  }
  function minimizeWindow(state: WindowState) {
    if (state.item.kind === 'profile') return;
    if (state.item.kind === 'gallery') { collapseGallery(state); return; }
    state.galleryRoot?.galleryController.setVisible(false);
    state.minimized = true; state.el.hidden = true; state.el.setAttribute('aria-hidden', 'true'); updateTray();
    const remaining = visibleWindows();
    activeWindow = null; if (remaining.length) bringForward(remaining.at(-1)!);
    restoreFocus(state); announce(`${state.item.label} minimized.`);
  }
  function toggleZoom(state: WindowState) {
    if (state.item.kind === 'profile') return;
    if (state.maximized) { state.maximized = false; setWindowBounds(state, state.previousBounds!); }
    else { state.previousBounds = { ...state.bounds }; state.maximized = true; setMaximizedBounds(state); }
    state.el.querySelector('.traffic-zoom')!.setAttribute('aria-pressed', String(state.maximized));
  }
  function sidebar(id: string) {
    return `<p class="sidebar-label">Favourites</p>${folders.map(folder => `<button data-navigate="${folder.id}" aria-current="${id === folder.id}"><img src="${asset(folder.icon!)}" alt="">${escape(folder.label)}</button>`).join('')}`;
  }
  function renderWindow(state: WindowState, item: DesktopItem) {
    state.item = item;
    const isProfile = item.kind === 'profile';
    const isGallery = item.kind === 'gallery';
    const isLibrary = item.kind === 'library';
    const isTerminal = item.id === 'terminal';
    const bare = isProfile || isGallery || isLibrary || isTerminal; // no Finder sidebar or footer
    state.el.dataset.entity = item.id;
    state.el.classList.toggle('library-window', isLibrary);
    state.el.classList.toggle('terminal-window', isTerminal);
    state.el.classList.toggle('about-window', isProfile);
    state.el.classList.toggle('gallery-window', isGallery);
    state.el.classList.toggle('preview', item.kind === 'photo');
    state.el.classList.toggle('document', item.kind === 'document');
    const project = projects.find(entry => entry.id === item.id);
    const folderRoot = folders.find(folder => folder.id === state.key);
    const title = folderRoot && project ? project.title : item.label;
    state.el.querySelector('.window-title')!.innerHTML = `${item.icon ? `<img src="${asset(item.icon)}" alt="">` : ''}${escape(title)}`;
    // Finder-style toolbar for folder windows: a Back/Forward pill and the current location's name.
    const breadcrumb = state.el.querySelector<HTMLElement>('.window-breadcrumb')!;
    breadcrumb.hidden = !folderRoot;
    state.el.querySelector('.window-header')!.classList.toggle('has-toolbar', Boolean(folderRoot));
    if (folderRoot) {
      const atRoot = item.id === folderRoot.id;
      const chevron = (d: string) => `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="${d}"/></svg>`;
      breadcrumb.innerHTML = `<div class="nav-pill">`
        + `<button data-window-action="back" aria-label="Back to ${escape(folderRoot.label)}"${atRoot ? ' disabled' : ''}>${chevron('M10 3 5 8l5 5')}</button>`
        + `<span class="nav-pill-divider" aria-hidden="true"></span>`
        + `<button data-window-action="forward" aria-label="Forward"${atRoot && state.forward ? '' : ' disabled'}>${chevron('m6 3 5 5-5 5')}</button>`
        + `</div><span class="nav-location" aria-hidden="true">${escape(title)}</span>`;
    } else breadcrumb.replaceChildren();
    const side = state.el.querySelector<HTMLElement>('.window-sidebar')!;
    side.hidden = bare;
    side.innerHTML = bare ? '' : sidebar(item.id);
    const footer = state.el.querySelector<HTMLElement>('.window-footer')!;
    footer.hidden = bare;
    state.el.querySelector<HTMLButtonElement>('.traffic-minimize')!.disabled = isProfile;
    state.el.querySelector<HTMLButtonElement>('.traffic-zoom')!.disabled = isProfile;
    const content = state.el.querySelector<HTMLElement>('.window-content')!;
    if (isGallery) {
      state.galleryRoot = createProjectGallery(galleryItems, {
        onInteract: () => bringForward(state),
        onOpenLibrary: () => openItem('photo-library', state.el),
      });
      content.replaceChildren(state.galleryRoot);
    } else {
      const node = windowContent(item.id, item.kind);
      if (state.contentRoot) renderNow(state.contentRoot, node);
      else state.contentRoot = mountInto(content, node);
    }
    content.scrollTop = 0;
    requestAnimationFrame(() => syncScrollHint(state));
    const status = item.id === 'projects' ? `${projects.length} projects` : item.kind === 'folder' ? '1 folder' : escape(item.label);
    footer.innerHTML = `<span>${item.kind === 'photo' ? 'Preview' : item.kind === 'document' ? 'Plain text' : 'Xiaoya’s desktop'}</span><span>${status}</span>`;
    updateTray();
  }
  /** My Photos window height that shows the whole 3-column grid: title bar + heading + square rows + 2px gaps. */
  function libraryHeight(width: number) {
    const rows = Math.ceil(galleryItems.length / 3), thumb = (width - 4) / 3;
    return Math.round(49 + 78 + rows * thumb + rows * 2);
  }
  function defaultWindowBounds(item: DesktopItem): Rect {
    const area = visibleArea();
    const isProfile = item.kind === 'profile';
    const isGallery = item.kind === 'gallery';
    // Photos scales with the screen (about a quarter of its width), keeping the same proportions.
    const galleryWidth = clamp(board().width * .22, 270, 360); // portrait photos
    const width = Math.min(isGallery ? galleryWidth : item.kind === 'library' ? 480 : item.id === 'terminal' ? 660 : isProfile ? 340 : item.id === 'hello' ? 760 : 900, area.width);
    let height = Math.min(isGallery ? Math.round(galleryWidth * 1.33) : item.kind === 'library' ? libraryHeight(Math.min(480, area.width)) : item.id === 'terminal' ? 450 : isProfile ? 320 : item.id === 'hello' ? 620 : 610, area.height);
    const offset = isProfile || isGallery ? 0 : (openWindows.size % 4) * 23;
    const wideGallery = isGallery && board().width >= COMPACT_MAX_WIDTH + 1;
    const x = clamp(wideGallery ? board().width * .732 : isGallery ? board().width - width - 36 : (board().width - width) / 2 + offset, area.x, area.x + area.width - width);
    // Projects opens higher, leaving a 16px gap above the Tech Stack dock.
    if (!isCompact() && item.id === 'projects') {
      const dockTop = document.querySelector('.tech-stack')!.getBoundingClientRect().top - workspace.getBoundingClientRect().top;
      const bottom = dockTop > area.y ? Math.min(area.y + area.height, dockTop - 16) : area.y + area.height;
      const y = Math.min(area.y + 12, Math.max(area.y, bottom - 250));
      height = Math.min(height, Math.max(250, bottom - y));
      return { x, y, width, height };
    }
    const y = clamp(wideGallery ? board().height * .233 : area.y + (isProfile ? Math.max(0, (area.height - height) / 2) : Math.min(45, Math.max(0, (area.height - height) / 2))) + offset, area.y, area.y + area.height - height);
    return { x, y, width, height };
  }
  function openItem(id: string, openerOverride: HTMLElement | null = null, { focus = true } = {}) {
    const item = itemFor(id); if (!item) return;
    if (item.kind === 'gallery') galleryDismissed = false;
    const existing = openWindows.get(id);
    if (existing) {
      existing.opener = openerOverride || elements.get(id) || document.activeElement as HTMLElement | null;
      existing.originWindow = existing.opener?.closest<HTMLElement>('.desktop-window') ?? null;
      if (item.kind !== 'gallery') renderWindow(existing, item);
      revealWindow(existing); bringForward(existing, focus); return;
    }
    const el = document.createElement('section');
    const titleId = `desktop-window-title-${++serial}`;
    el.className = 'desktop-window'; el.dataset.window = id;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-labelledby', titleId);
    el.innerHTML = `<header class="window-header" tabindex="0" aria-label="Move this window with arrow keys"><div class="traffic-lights"><button class="traffic-close" data-window-action="close" aria-label="Close window"><span aria-hidden="true">×</span></button><button class="traffic-minimize" data-window-action="minimize" aria-label="Minimize window"><span aria-hidden="true">−</span></button><button class="traffic-zoom" data-window-action="zoom" aria-label="Toggle window size" aria-pressed="false"><span aria-hidden="true">+</span></button></div><nav class="window-breadcrumb" aria-label="Folder navigation" hidden></nav><span class="window-title" id="${titleId}"></span></header><div class="window-main"><nav class="window-sidebar" aria-label="Folder shortcuts"></nav><div class="window-content"></div><button class="scroll-hint" type="button" tabindex="-1" aria-label="Scroll down for more" hidden><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 6 4.5 4.5L12.5 6"/></svg></button></div><footer class="window-footer"></footer>`;
    const opener = openerOverride || elements.get(id) || document.activeElement as HTMLElement | null;
    const state: WindowState = { key: id, item, el, opener, originWindow: opener?.closest<HTMLElement>('.desktop-window') ?? null, bounds: defaultWindowBounds(item), maximized: false, minimized: false, createdCompact: isCompact() };
    openWindows.set(id, state); windowsLayer.append(el);
    watchScrollHint(state);
    renderWindow(state, item); setWindowBounds(state, state.bounds); bringForward(state, focus);
    announce(`${item.label} opened.`);
  }

  // ---- Pointer and keyboard ------------------------------------------------------------------
  function endDrag(event: PointerEvent, cancelled = false) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (drag.moved && !cancelled) dodgeTrashForDrag(event, drag, true);
    const finished = drag; drag = null;
    finished.el.classList.remove('is-dragging');
    if (finished.moved && finished.type === 'item') {
      if (finished.id === 'trash') escapedTrashPosition = null;
      suppressed.set(finished.id, performance.now() + 350);
      savePosition(finished.id);
      announce(`${catalogItem(finished.id).label} moved.`);
    }
    if (finished.moved && finished.type === 'window') { const state = openWindows.get(finished.id); if (state) state.userPlaced = true; }
    if (finished.el.hasPointerCapture?.(event.pointerId)) finished.el.releasePointerCapture(event.pointerId);
  }
  workspace.addEventListener('pointerdown', event => {
    if (event.button !== 0 || drag) return;
    const target = event.target as Element;
    const item = target.closest<HTMLElement>('.desktop-item');
    if (item) {
      if (isCompact()) return;
      const id = item.dataset.item!; suppressed.delete(id); select(id); item.focus({ preventScroll: true });
      drag = { type: 'item', id, el: item, pointerId: event.pointerId, start: { x: event.clientX, y: event.clientY }, origin: { ...positions.get(id)! }, moved: false };
      item.setPointerCapture?.(event.pointerId); return;
    }
    const windowEl = target.closest<HTMLElement>('.desktop-window');
    if (windowEl) {
      const state = openWindows.get(windowEl.dataset.window!)!; bringForward(state);
      const header = target.closest('.window-header');
      if (header && !target.closest('button') && !state.maximized && !isCompact()) {
        drag = { type: 'window', id: state.key, el: windowEl, pointerId: event.pointerId, start: { x: event.clientX, y: event.clientY }, origin: { x: state.bounds.x, y: state.bounds.y }, moved: false };
        windowEl.setPointerCapture?.(event.pointerId);
      }
    }
  });
  workspace.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const delta = { x: event.clientX - drag.start.x, y: event.clientY - drag.start.y };
    if (!drag.moved && Math.hypot(delta.x, delta.y) < 6) return;
    drag.moved = true; event.preventDefault(); drag.el.classList.add('is-dragging');
    const position = { x: drag.origin.x + delta.x, y: drag.origin.y + delta.y };
    if (drag.type === 'item') place(drag.id, position);
    else { const state = openWindows.get(drag.id); if (state) setWindowBounds(state, { ...state.bounds, ...position }); else drag = null; }
    if (drag) dodgeTrashForDrag(event);
  }, { passive: false });
  workspace.addEventListener('pointerup', event => endDrag(event));
  workspace.addEventListener('pointercancel', event => endDrag(event, true));
  workspace.addEventListener('lostpointercapture', event => { if (drag?.pointerId === event.pointerId) endDrag(event, true); });
  workspace.addEventListener('dragstart', event => event.preventDefault());
  workspace.addEventListener('click', event => {
    const target = event.target as Element;
    const item = target.closest<HTMLElement>('.desktop-item');
    if (item) {
      const id = item.dataset.item!;
      if (event.detail !== 0 && (suppressed.get(id) || 0) > performance.now()) { event.preventDefault(); return; }
      select(id);
      if (id === 'trash') trashController?.tease();
      else if (id === 'photos') openItem('gallery', photosLauncher, { focus: event.detail === 0 });
      else if (id === 'messages') openMessageGreeting({ focus: event.detail === 0 });
      else if (id === 'techstack') openTechGroup();
      else openItem(id);
      return;
    }
    // The dim layer lets clicks through, so icons and widgets still work while windows are open (they stay open).
    // Clicking empty desktop space closes only the window in front.
    if (!windowBackdrop.hidden && target === workspace) { closeWindow(activeWindow ? openWindows.get(activeWindow) : visibleWindows().at(-1)); return; }
    const el = target.closest<HTMLElement>('.desktop-window');
    if (el) {
      const state = openWindows.get(el.dataset.window!)!;
      const action = target.closest<HTMLElement>('[data-window-action]')?.dataset.windowAction;
      if (action === 'close') { closeWindow(state); return; }
      if (action === 'minimize') { minimizeWindow(state); return; }
      if (action === 'zoom') { toggleZoom(state); return; }
      if (action === 'back') {
        const from = state.item.id;
        state.forward = from;
        renderWindow(state, catalogItem(state.key));
        state.el.querySelector<HTMLElement>(`[data-open="${from}"]`)?.focus({ preventScroll: true });
        state.el.querySelector<HTMLElement>(`[data-open="${from}"]`)?.scrollIntoView({ block: 'nearest' });
        return;
      }
      if (action === 'forward') {
        const destination = state.forward ? itemFor(state.forward) : undefined;
        if (!destination) return;
        state.forward = undefined;
        renderWindow(state, destination);
        state.el.querySelector<HTMLElement>('[data-window-action="back"]')!.focus({ preventScroll: true });
        return;
      }
      const navigation = target.closest<HTMLElement>('[data-navigate]');
      if (navigation) { renderWindow(state, catalogItem(navigation.dataset.navigate!)); return; }
      const open = target.closest<HTMLElement>('[data-open]');
      if (open) {
        // Inside a folder window, a project opens in place (like Finder) instead of in a new window.
        const destination = itemFor(open.dataset.open!);
        if (destination && folders.some(folder => folder.id === state.key)) {
          state.forward = undefined;
          renderWindow(state, destination);
          state.el.querySelector<HTMLElement>('[data-window-action="back"]')!.focus({ preventScroll: true });
        } else openItem(open.dataset.open!);
        return;
      }
      bringForward(state); return;
    }
    if (target === desktop || target === workspace) select(null);
  });
  workspace.addEventListener('keydown', event => {
    const moves: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const movement = moves[event.key]; if (!movement) return;
    const target = event.target as Element;
    const item = target.closest<HTMLElement>('.desktop-item');
    const header = target.closest<HTMLElement>('.window-header');
    if (item) {
      if (isCompact()) return;
      event.preventDefault(); const id = item.dataset.item!; select(id);
      const current = positions.get(id)!; const step = event.shiftKey ? 25 : 8;
      place(id, { x: current.x + movement[0] * step, y: current.y + movement[1] * step }); savePosition(id);
      if (id === 'trash') escapedTrashPosition = null;
      else { const next = positions.get(id)!, size = sizeOf(item); dodgeTrash({ x: next.x + size.width / 2, y: next.y + size.height / 2, draggedRect: { ...next, ...size }, id, force: true }); }
    } else if (header && target === header && !isCompact()) {
      event.preventDefault(); const state = openWindows.get(header.closest<HTMLElement>('.desktop-window')!.dataset.window!)!; if (state.maximized) return;
      const step = event.shiftKey ? 25 : 8; state.userPlaced = true; setWindowBounds(state, { ...state.bounds, x: state.bounds.x + movement[0] * step, y: state.bounds.y + movement[1] * step });
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (closeMenus(true)) { event.preventDefault(); return; }
    if (techGroupOpen() && !document.querySelector('.ai-tools-popover:not([hidden])')) { event.preventDefault(); closeTechGroup(); return; }
    const state = activeWindow ? openWindows.get(activeWindow) : undefined;
    if (state && !state.minimized) closeWindow(state); else select(null);
  });
  // Keep Tab inside the open window on compact screens.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !isCompact() || !document.documentElement.classList.contains('compact-app-open')) return;
    const dialog = techGroupOpen() ? techSection : activeWindow ? openWindows.get(activeWindow)?.el : null;
    if (!dialog || dialog.hidden) return;
    const query = 'button:not(:disabled),a[href],iframe,[tabindex="0"]';
    const controls = [...dialog.querySelectorAll<HTMLElement>(query)]
      .filter(el => !el.closest('[hidden]') && getComputedStyle(el).display !== 'none');
    if (!controls.length) return;
    const current = document.activeElement as HTMLElement | null;
    if (!dialog.contains(current) || event.shiftKey && current === controls[0] || !event.shiftKey && current === controls.at(-1)) {
      event.preventDefault(); (event.shiftKey ? controls.at(-1)! : controls[0]).focus({ preventScroll: true });
    }
  });
  windowsLayer.addEventListener('focusin', event => {
    const el = (event.target as Element).closest<HTMLElement>('.desktop-window');
    if (el) { const state = openWindows.get(el.dataset.window!)!; if (activeWindow !== state.key) bringForward(state); }
  });
  tray.addEventListener('click', event => {
    const button = (event.target as Element).closest<HTMLElement>('[data-restore]');
    if (button) { const state = openWindows.get(button.dataset.restore!); if (state) { revealWindow(state); bringForward(state, true); } }
  });
  // Restart: restore the default icon, widget, and Trash arrangement.
  $('tidy').addEventListener('click', () => {
    saved = emptyLayout();
    escapedTrashPosition = null; trashController?.reset();
    try { storage?.removeItem(storageKey); } catch { /* ignore */ }
    widgetDragging?.reset();
    const gallery = openWindows.get('gallery'); if (gallery) gallery.userPlaced = false;
    layout(); announce('Desktop arranged back to its original layout.');
  });

  // Top-bar links: each folder, then Photos (opens the photo library window).
  const menuLinks = [...folders, libraryItem].map(entry => `<button data-menu-open="${entry.id}">${escape(entry.label)}</button>`).join('');
  $('folder-nav').innerHTML = menuLinks;
  toolbar.addEventListener('click', event => {
    const target = event.target as Element;
    if (target.closest('#app-menu-toggle')) { toggleMenu(appMenuToggle, appMenu); return; }
    const button = target.closest<HTMLElement>('[data-menu-open]');
    if (button) {
      const opener = appMenu.contains(button) ? appMenuToggle : button;
      closeMenus(); openItem(button.dataset.menuOpen!, opener, { focus: button.dataset.menuOpen !== 'gallery' || event.detail === 0 }); return;
    }
    if (target.closest('#tidy')) closeMenus(true);
    else if (target.closest('.header-socials a')) closeMenus();
  });
  toolbar.addEventListener('keydown', event => {
    const target = event.target as HTMLElement;
    const popup = target.closest<HTMLElement>('.bar-popover');
    const nav = target.closest<HTMLElement>('#folder-nav');
    if (!popup && !nav) return;
    const forward = popup ? 'ArrowDown' : 'ArrowRight'; const backward = popup ? 'ArrowUp' : 'ArrowLeft';
    if (![forward, backward, 'Home', 'End'].includes(event.key)) return;
    const buttons = [...(popup || nav)!.querySelectorAll<HTMLElement>('button')]; const index = buttons.indexOf(target); if (index < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === forward ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
  });
  toolbar.addEventListener('focusout', event => { if (event.relatedTarget && !toolbar.contains(event.relatedTarget as Node)) closeMenus(); });
  document.addEventListener('click', event => { if (!toolbar.contains(event.target as Node)) closeMenus(); });
  window.addEventListener('resize', () => { if (closeMenus()) appMenuToggle.focus({ preventScroll: true }); });
  initAiTools();

  // ---- Start ------------------------------------------------------------------------------
  renderDesktop();
  renderWidgets();
  widgetDragging = initWidgetDragging({ workspace, container: widgetStack, storage, onDrag: (detail: WidgetDragDetail) => dodgeTrash(detail) });
  layout();
  trashController = createDodgingTrash({
    element: elements.get('trash')!, workspace, isCompact, announce,
    getPosition: () => positions.get('trash') || defaultPosition(catalogItem('trash')),
    setPosition: position => { escapedTrashPosition = { ...position }; place('trash', position); },
    getObstacles: () => [document.querySelector<HTMLElement>('.tech-dock'), ...widgetStack.children as unknown as HTMLElement[]]
      .filter((el): el is HTMLElement => Boolean(el) && !el!.hidden)
      .map(el => {
        const rect = el.getBoundingClientRect(), origin = workspace.getBoundingClientRect();
        return { x: rect.left - origin.left, y: rect.top - origin.top, width: rect.width, height: rect.height };
      }).filter(rect => rect.width > 0 && rect.height > 0),
  });
  if (!galleryDismissed && !isCompact()) openItem('gallery', appMenuToggle, { focus: false });
  updateTray();
  if ('ResizeObserver' in window) { const observer = new ResizeObserver(scheduleLayout); observer.observe(workspace); observer.observe(widgetStack); }
  window.addEventListener('resize', scheduleLayout);
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(viewportFrame);
    viewportFrame = requestAnimationFrame(() => { for (const state of openWindows.values()) if (state.maximized) setMaximizedBounds(state); });
  }, { passive: true });
  for (const image of desktop.querySelectorAll('img')) image.addEventListener('load', scheduleLayout, { once: true });
}

// The engine keeps DOM state outside React, so a hot update to it reloads the page.
if (import.meta.hot) import.meta.hot.accept(() => window.location.reload());
