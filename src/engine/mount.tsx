import type { ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';

/**
 * Render React content into an engine-owned element synchronously, so the engine can
 * measure it or attach behavior right away. The engine may later move `host` around the
 * DOM (for example into the compact app view); React keeps working inside it.
 */
export function mountInto(host: HTMLElement, node: ReactNode): Root {
  const root = createRoot(host);
  flushSync(() => root.render(node));
  return root;
}

export function renderNow(root: Root, node: ReactNode): void {
  flushSync(() => root.render(node));
}
