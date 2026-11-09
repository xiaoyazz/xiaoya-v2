import { boundPosition, clamp, emptyLayout, readLayout, toPixels, toRatios, type Point, type Rect } from './layout';

const storageKey = 'xiaoya-widget-layout-v1';
const interactive = 'button,a,input,select,textarea,[contenteditable="true"]';
export type WidgetId = 'weather' | 'spotify' | 'messages';
const widgetNames: Record<WidgetId, string> = { weather: 'Toronto weather', spotify: 'Spotify', messages: 'Messages' };
const selectors: Record<WidgetId, string> = { weather: '.weather-widget', spotify: '.spotify-widget', messages: '.message-greeting' };

export interface WidgetDragDetail { id: WidgetId; x: number; y: number; draggedRect: Rect; force?: boolean }
interface WidgetState { id: WidgetId; root: HTMLElement; handle: HTMLElement; offset: Point }
interface DragState { state: WidgetState; pointerId: number; start: Point; origin: Point; moved: boolean }
export interface WidgetDragging { layout(): void; cancel(id?: WidgetId): void; reset(): void; destroy(): void }

// Weather moves by its city heading, Messages by its header, Spotify by a small handle above the player.
export function initWidgetDragging({ workspace, container, storage, onMove, onDrag = () => {} }: {
  workspace: HTMLElement; container: HTMLElement; storage: Storage | null;
  onMove?: (id: WidgetId) => void; onDrag?: (detail: WidgetDragDetail) => void;
}): WidgetDragging {
  let saved = readLayout(storage, storageKey);
  let drag: DragState | null = null;
  let destroyed = false;
  let layer = 0;
  const states = new Map<WidgetId, WidgetState>();
  const toolbar = document.querySelector('.desktop-bar');
  const mode = () => workspace.clientWidth <= 1139 ? 'mobile' : 'desktop';
  const board = () => ({ width: workspace.clientWidth, height: workspace.clientHeight });

  for (const id of Object.keys(selectors) as WidgetId[]) {
    const root = container.querySelector<HTMLElement>(selectors[id]);
    if (!root) continue;
    root.dataset.widget = id;
    let handle: HTMLElement | null;
    if (id === 'spotify') {
      handle = document.createElement('div');
      handle.className = 'spotify-drag-handle';
      handle.innerHTML = '<span aria-hidden="true"></span>';
      root.prepend(handle);
    } else handle = root.querySelector<HTMLElement>(id === 'weather' ? '.weather-city' : '.message-heading');
    if (!handle) continue;
    handle.classList.add('widget-drag-handle');
    handle.dataset.widgetHandle = id;
    handle.tabIndex = 0;
    handle.setAttribute('aria-label', `Move ${widgetNames[id]}. Drag or use arrow keys.`);
    handle.title = 'Drag to move · Arrow keys to move · Shift for larger steps';
    states.set(id, { id, root, handle, offset: { x: 0, y: 0 } });
  }

  function geometry(state: WidgetState) {
    const workspaceBounds = workspace.getBoundingClientRect();
    const bounds = state.root.getBoundingClientRect();
    return {
      origin: { x: bounds.left - workspaceBounds.left - state.offset.x, y: bounds.top - workspaceBounds.top - state.offset.y },
      size: { width: bounds.width || state.root.offsetWidth, height: bounds.height || state.root.offsetHeight },
      workspaceBounds,
    };
  }
  function position(state: WidgetState): Point {
    const { origin } = geometry(state);
    return { x: origin.x + state.offset.x, y: origin.y + state.offset.y };
  }
  function apply(state: WidgetState, requested: Point): Point {
    const { origin, size, workspaceBounds } = geometry(state);
    const dimensions = board();
    const safe = boundPosition(requested, dimensions, size);
    const menuBottom = toolbar?.getBoundingClientRect().bottom || 0;
    const minY = Math.min(Math.max(12, menuBottom - workspaceBounds.top + 12), Math.max(12, dimensions.height - size.height - 12));
    safe.y = clamp(safe.y, minY, dimensions.height - size.height - 12);
    state.offset = { x: safe.x - origin.x, y: safe.y - origin.y };
    state.root.style.transform = `translate3d(${state.offset.x}px,${state.offset.y}px,0)`;
    state.root.dataset.widgetX = String(safe.x);
    state.root.dataset.widgetY = String(safe.y);
    return safe;
  }
  function persist(state: WidgetState) {
    saved[mode()][state.id] = toRatios(position(state), board(), geometry(state).size);
    try { storage?.setItem(storageKey, JSON.stringify(saved)); } catch { /* storage full or blocked */ }
    onMove?.(state.id);
  }
  function layout() {
    if (destroyed) return;
    if (drag?.moved) finishDrag();
    for (const state of states.values()) {
      if (state.root.hidden) continue;
      const ratios = saved[mode()][state.id];
      if (ratios) {
        apply(state, toPixels(ratios, board(), geometry(state).size));
      } else {
        state.root.style.removeProperty('transform');
        state.offset = { x: 0, y: 0 };
        const current = position(state);
        state.root.dataset.widgetX = String(current.x);
        state.root.dataset.widgetY = String(current.y);
      }
    }
  }
  function finishDrag() {
    if (!drag) return;
    const finished = drag; drag = null;
    finished.state.root.classList.remove('is-widget-dragging');
    container.classList.remove('is-widget-dragging');
    if (finished.moved) persist(finished.state);
    try {
      if (finished.state.handle.hasPointerCapture?.(finished.pointerId)) finished.state.handle.releasePointerCapture(finished.pointerId);
    } catch { /* already released */ }
  }
  function bringForward(state: WidgetState) {
    if (layer >= 100) { for (const item of states.values()) item.root.style.removeProperty('z-index'); layer = 0; }
    state.root.style.zIndex = String(++layer);
  }
  function pointerDown(event: PointerEvent) {
    if (event.button !== 0 || drag || mode() === 'mobile') return;
    const target = event.target as Element;
    const handle = target.closest<HTMLElement>('[data-widget-handle]');
    if (!handle || !container.contains(handle) || target.closest(interactive)) return;
    const state = states.get(handle.dataset.widgetHandle as WidgetId);
    if (!state || state.root.hidden) return;
    bringForward(state);
    handle.focus({ preventScroll: true }); event.preventDefault();
    drag = { state, pointerId: event.pointerId, start: { x: event.clientX, y: event.clientY }, origin: position(state), moved: false };
    try { handle.setPointerCapture?.(event.pointerId); } catch { /* unsupported */ }
  }
  function pointerMove(event: PointerEvent) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (drag.state.root.hidden) { finishDrag(); return; }
    const delta = { x: event.clientX - drag.start.x, y: event.clientY - drag.start.y };
    if (!drag.moved && Math.hypot(delta.x, delta.y) < 6) return;
    drag.moved = true; event.preventDefault();
    drag.state.root.classList.add('is-widget-dragging');
    container.classList.add('is-widget-dragging');
    const safe = apply(drag.state, { x: drag.origin.x + delta.x, y: drag.origin.y + delta.y });
    const { size, workspaceBounds } = geometry(drag.state);
    onDrag({ id: drag.state.id, x: event.clientX - workspaceBounds.left, y: event.clientY - workspaceBounds.top, draggedRect: { ...safe, ...size } });
  }
  function pointerEnd(event: PointerEvent) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (drag.moved && event.type === 'pointerup') {
      const { size, workspaceBounds } = geometry(drag.state);
      onDrag({ id: drag.state.id, x: event.clientX - workspaceBounds.left, y: event.clientY - workspaceBounds.top, draggedRect: { ...position(drag.state), ...size }, force: true });
    }
    finishDrag();
  }
  function keyDown(event: KeyboardEvent) {
    const movements: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const movement = movements[event.key]; if (!movement) return;
    const target = event.target as Element;
    const handle = target.closest<HTMLElement>('[data-widget-handle]');
    if (!handle || target !== handle || target.closest(interactive)) return;
    const state = states.get(handle.dataset.widgetHandle as WidgetId); if (!state || state.root.hidden) return;
    bringForward(state);
    event.preventDefault(); event.stopPropagation();
    const current = position(state), step = event.shiftKey ? 25 : 8;
    const safe = apply(state, { x: current.x + movement[0] * step, y: current.y + movement[1] * step }); persist(state);
    const { size } = geometry(state);
    onDrag({ id: state.id, x: safe.x + size.width / 2, y: safe.y + size.height / 2, draggedRect: { ...safe, ...size }, force: true });
  }
  container.addEventListener('pointerdown', pointerDown);
  container.addEventListener('lostpointercapture', pointerEnd);
  container.addEventListener('keydown', keyDown);
  window.addEventListener('pointermove', pointerMove, { passive: false });
  window.addEventListener('pointerup', pointerEnd);
  window.addEventListener('pointercancel', pointerEnd);
  layout();
  return {
    layout,
    cancel(id) { if (!id || drag?.state.id === id) finishDrag(); },
    reset() {
      finishDrag(); saved = emptyLayout();
      for (const state of states.values()) state.root.style.removeProperty('z-index'); layer = 0;
      try { storage?.removeItem(storageKey); } catch { /* ignore */ }
      layout();
    },
    destroy() {
      finishDrag(); destroyed = true;
      container.removeEventListener('pointerdown', pointerDown);
      container.removeEventListener('lostpointercapture', pointerEnd);
      container.removeEventListener('keydown', keyDown);
      window.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('pointerup', pointerEnd);
      window.removeEventListener('pointercancel', pointerEnd);
    },
  };
}
