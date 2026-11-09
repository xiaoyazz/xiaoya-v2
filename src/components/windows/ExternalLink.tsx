import type { ReactNode } from 'react';

/** A link that opens in a new tab, with an optional icon before the label. */
export function ExternalLink({ href, label, icon }: { href: string; label: string; icon?: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{icon}{label} ↗</a>;
}
