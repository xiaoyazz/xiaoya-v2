export interface Point { x: number; y: number }
export interface Size { width: number; height: number }
export type Rect = Point & Size;
export type Ratios = [number, number];
export interface SavedLayout { desktop: Record<string, Ratios>; mobile: Record<string, Ratios> }

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(Number(value) || 0, min), Math.max(min, max));
}
export function toPixels(ratios: Ratios | undefined, board: Size, item: Size, margin = 12): Point {
  return {
    x: margin + clamp(ratios?.[0] ?? 0, 0, 1) * Math.max(0, board.width - item.width - margin * 2),
    y: margin + clamp(ratios?.[1] ?? 0, 0, 1) * Math.max(0, board.height - item.height - margin * 2),
  };
}
export function toRatios(position: Point, board: Size, item: Size, margin = 12): Ratios {
  const width = Math.max(0, board.width - item.width - margin * 2);
  const height = Math.max(0, board.height - item.height - margin * 2);
  return [
    width ? clamp((position.x - margin) / width, 0, 1) : 0,
    height ? clamp((position.y - margin) / height, 0, 1) : 0,
  ];
}
export function boundPosition(position: Point, board: Size, item: Size, margin = 12): Point {
  return {
    x: clamp(position.x, margin, board.width - item.width - margin),
    y: clamp(position.y, margin, board.height - item.height - margin),
  };
}
export function emptyLayout(): SavedLayout { return { desktop: {}, mobile: {} }; }
export function readLayout(storage: Storage | null, key: string): SavedLayout {
  try {
    const source = JSON.parse(storage?.getItem(key) || '{}') as Partial<Record<keyof SavedLayout, Record<string, unknown>>>;
    const clean = emptyLayout();
    for (const mode of ['desktop', 'mobile'] as const) {
      for (const [id, ratios] of Object.entries(source[mode] || {})) {
        if (Array.isArray(ratios) && ratios.length === 2 && ratios.every(value => typeof value === 'number' && Number.isFinite(value))) {
          clean[mode][id] = [clamp(ratios[0], 0, 1), clamp(ratios[1], 0, 1)];
        }
      }
    }
    return clean;
  } catch {
    return emptyLayout();
  }
}
