import type { Point, Rect, Size } from './layout';

const margin = 12;
const gap = 8;
const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const overlaps = (a: Rect, b: Rect) => a.x < b.x + b.width + gap && a.x + a.width + gap > b.x && a.y < b.y + b.height + gap && a.y + a.height + gap > b.y;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export interface LayoutItem extends Rect { id: string; locked?: boolean }
interface Limits { minX: number; maxX: number; minY: number; maxY: number }

function axisCandidates(min: number, max: number, preferred: number, edges: number[]): number[] {
  if (max < min) return [];
  const values = new Set([min, max, clamp(preferred, min, max)]);
  const step = Math.max(16, Math.ceil((max - min) / 128));
  for (let value = min; value < max; value += step) values.add(value);
  for (const value of edges) if (finite(value) && value >= min && value <= max) values.add(value);
  return [...values];
}

function nearestSlot(item: LayoutItem, reserved: Rect, occupied: Rect[], limits: Limits): Point | null {
  const { minX, maxX, minY, maxY } = limits;
  if (maxX < minX || maxY < minY) return null;
  const xs = axisCandidates(minX, maxX, item.x, [
    reserved.x, reserved.x + reserved.width + gap, reserved.x - item.width - gap,
    ...occupied.flatMap(rect => [rect.x - item.width - gap, rect.x + rect.width + gap]),
  ]);
  const ys = axisCandidates(minY, maxY, item.y, [
    reserved.y, reserved.y + reserved.height + gap, reserved.y - item.height - gap,
    ...occupied.flatMap(rect => [rect.y - item.height - gap, rect.y + rect.height + gap]),
  ]);
  let best: Point | null = null;
  let bestDistance = Infinity;
  for (const y of ys) for (const x of xs) {
    const distance = (x - item.x) ** 2 + (y - item.y) ** 2;
    if (distance >= bestDistance) continue;
    const candidate = { x, y, width: item.width, height: item.height };
    if (overlaps(candidate, reserved) || occupied.some(rect => overlaps(candidate, rect))) continue;
    best = { x, y }; bestDistance = distance;
  }
  return best;
}

/** Move unlocked icons out of the widget column. Returns only changed positions; saved layout data stays intact. */
export function avoidWidgetOverlap(items: LayoutItem[], reserved: Rect, board: Size & { minY?: number }): Map<string, Point> {
  const changes = new Map<string, Point>();
  if (!Array.isArray(items) || !reserved || !board) return changes;
  if (![board.width, board.height, reserved.x, reserved.y, reserved.width, reserved.height].every(finite)) return changes;
  if (board.width <= margin * 2 || board.height <= margin * 2 || reserved.width <= 0 || reserved.height <= 0) return changes;
  const seen = new Set<string>();
  const rectangles = items.filter(item => {
    if (!item || item.id == null || seen.has(item.id) || ![item.x, item.y, item.width, item.height].every(finite) || item.width <= 0 || item.height <= 0) return false;
    seen.add(item.id); return true;
  }).map(item => ({ ...item }));
  const colliders = rectangles.filter(item => !item.locked && overlaps(item, reserved));
  for (const item of colliders) {
    const occupied = rectangles.filter(rect => rect !== item);
    const bounds = { minX: margin, maxX: board.width - margin - item.width, minY: Math.max(margin, finite(board.minY) ? board.minY : margin), maxY: board.height - margin - item.height };
    const below = {
      minX: Math.max(bounds.minX, reserved.x),
      maxX: Math.min(bounds.maxX, reserved.x + reserved.width - item.width),
      minY: Math.max(bounds.minY, reserved.y + reserved.height + gap),
      maxY: bounds.maxY,
    };
    const position = nearestSlot(item, reserved, occupied, below) || nearestSlot(item, reserved, occupied, bounds);
    if (!position) continue;
    if (position.x !== item.x || position.y !== item.y) changes.set(item.id, position);
    Object.assign(item, position);
  }
  return changes;
}
