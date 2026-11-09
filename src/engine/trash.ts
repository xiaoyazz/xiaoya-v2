import { clamp, type Point, type Rect } from './layout';

const finite = Number.isFinite;
const overlaps = (a: Rect, b: Rect, gap = 0) => a.x < b.x + b.width + gap && a.x + a.width + gap > b.x && a.y < b.y + b.height + gap && a.y + a.height + gap > b.y;
const pointDistance = (point: Point, rect: Rect) => Math.hypot(point.x - clamp(point.x, rect.x, rect.x + rect.width), point.y - clamp(point.y, rect.y, rect.y + rect.height));
const overlapArea = (a: Rect, b: Rect) => Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
const validRect = (rect: Partial<Rect> | null | undefined): rect is Rect => Boolean(rect) && [rect!.x, rect!.y, rect!.width, rect!.height].every(v => finite(v)) && rect!.width! > 0 && rect!.height! > 0;

export interface EvadeRequest { x: number; y: number; force?: boolean; draggedRect?: Rect | null }
export interface TrashController {
  evade(request: EvadeRequest): boolean;
  tease(): void;
  cancel(): void;
  reset(): void;
  destroy(): void;
}
interface TrashOptions {
  element: HTMLElement;
  workspace: HTMLElement;
  getPosition: () => Point | undefined;
  setPosition: (position: Point) => void;
  getObstacles?: () => Rect[];
  isCompact?: () => boolean;
  announce?: (message: string) => void;
  onDodge?: (position: Point, count: number) => void;
}

// evade() takes workspace-relative pointer coordinates. Pass force:true on drop
// and draggedRect when the dragged element extends beyond its pointer handle.
export function createDodgingTrash({ element, workspace, getPosition, setPosition, getObstacles = () => [], isCompact = () => false, announce = () => {}, onDodge = () => {} }: TrashOptions): TrashController {
  let disposed = false;
  let lastDodge = -Infinity;
  let lastAnnouncement = -Infinity;
  let dodgeCount = 0;
  let escapeTimer = 0;
  let bubbleTimer = 0;
  const bubble = document.createElement('span');
  bubble.className = 'trash-message'; bubble.dataset.trashBubble = ''; bubble.hidden = true;
  bubble.setAttribute('aria-hidden', 'true'); element.append(bubble);
  element.dataset.trashDodges = '0';

  function geometry() {
    const bounds = workspace.getBoundingClientRect();
    const width = workspace.clientWidth || bounds.width;
    const height = workspace.clientHeight || bounds.height;
    const size = { width: element.offsetWidth || 124, height: element.offsetHeight || 123 };
    const toolbarBottom = document.querySelector('.desktop-bar')?.getBoundingClientRect().bottom || 36;
    return { width, height, size, minY: Math.max(12, toolbarBottom - bounds.top + 12) };
  }
  function say(message: string) {
    if (disposed) return;
    clearTimeout(bubbleTimer);
    bubble.textContent = message; bubble.hidden = false;
    element.classList.toggle('trash-message-below', (getPosition()?.y || 0) < 100);
    bubbleTimer = window.setTimeout(() => { bubble.hidden = true; }, 1350);
  }
  function evade({ x, y, force = false, draggedRect }: EvadeRequest): boolean {
    if (disposed || isCompact() || element.hidden || element.classList.contains('is-dragging') || ![x, y].every(v => finite(v))) return false;
    const current = getPosition();
    if (!current || ![current.x, current.y].every(v => finite(v))) return false;
    const { width, height, size, minY } = geometry();
    if (width < size.width + 24 || height < size.height + minY + 12) return false;
    const pointer = { x, y };
    const currentRect = { ...current, ...size };
    const dragged = validRect(draggedRect) ? draggedRect : null;
    // Only dodge when something is actually dragged over the Trash: the pointer is on it, or the dragged item overlaps it.
    if (pointDistance(pointer, currentRect) > 0 && !(dragged && overlaps(currentRect, dragged))) return false;
    const now = performance.now();
    if (!force && now - lastDodge < 120) return false;

    const maxX = width - size.width - 12, maxY = height - size.height - 12;
    const bound = (point: Point) => ({ x: clamp(point.x, 12, maxX), y: clamp(point.y, minY, maxY) });
    const center = { x: current.x + size.width / 2, y: current.y + size.height / 2 };
    let dx = center.x - x, dy = center.y - y;
    if (Math.hypot(dx, dy) < 1) { const angle = (dodgeCount % 8) * Math.PI / 4; dx = Math.cos(angle); dy = Math.sin(angle); }
    const length = Math.hypot(dx, dy);
    const ideal = bound({ x: current.x + dx / length * 260, y: current.y + dy / length * 260 });
    const candidates = [ideal];
    for (let row = 0; row < 6; row++) for (let column = 0; column < 8; column++) candidates.push({ x: 12 + (maxX - 12) * column / 7, y: minY + (maxY - minY) * row / 5 });
    let obstacles: Rect[] = [];
    try { obstacles = (getObstacles() || []).filter(validRect); } catch { /* ignore */ }
    const scored = candidates.filter(candidate => Math.hypot(candidate.x - current.x, candidate.y - current.y) >= 100).map(candidate => {
      const rect = { ...candidate, ...size };
      const distance = pointDistance(pointer, rect);
      const dragOverlap = dragged ? overlapArea(rect, dragged) : 0;
      const obstacleOverlap = obstacles.reduce((total, obstacle) => total + overlapArea(rect, obstacle), 0);
      return { candidate, distance, dragOverlap, obstacleOverlap, idealDistance: Math.hypot(candidate.x - ideal.x, candidate.y - ideal.y) };
    });
    if (!scored.length) return false;
    const safe = scored.filter(candidate => candidate.distance >= 170 && candidate.dragOverlap === 0);
    const pool = safe.length ? safe : scored;
    pool.sort((a, b) => {
      if (!safe.length) { const safety = (b.distance - a.distance) + (a.dragOverlap - b.dragOverlap); if (safety) return safety; }
      return a.obstacleOverlap - b.obstacleOverlap || a.idealDistance - b.idealDistance || b.distance - a.distance;
    });
    const next = pool[0].candidate;
    lastDodge = now; dodgeCount += 1;
    setPosition(next);
    element.dataset.trashDodges = String(dodgeCount);
    clearTimeout(escapeTimer); element.classList.add('is-escaping');
    escapeTimer = window.setTimeout(() => element.classList.remove('is-escaping'), 240);
    say('Nice try!');
    if (now - lastAnnouncement > 1500) { announce('Trash dodged. Nothing was deleted.'); lastAnnouncement = now; }
    onDodge(next, dodgeCount);
    return true;
  }
  function cancel() { clearTimeout(escapeTimer); element.classList.remove('is-escaping'); }
  function reset() {
    cancel(); clearTimeout(bubbleTimer); bubble.hidden = true; dodgeCount = 0; lastDodge = -Infinity; lastAnnouncement = -Infinity;
    element.dataset.trashDodges = '0'; element.classList.remove('trash-message-below');
  }
  return {
    evade,
    tease() { if (!disposed) { say('Nothing to delete here.'); announce('Trash is empty. Nothing is deleted from this desktop.'); } },
    cancel,
    reset,
    destroy() { reset(); disposed = true; bubble.remove(); element.removeAttribute('data-trash-dodges'); },
  };
}
