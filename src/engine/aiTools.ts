// Hover, focus, or tap the AI Tools tile to reveal the OpenAI / Claude / Copilot popover.
export function initAiTools(): () => void {
  const trigger = document.getElementById('ai-tools-toggle');
  const popover = document.getElementById('ai-tools-popover');
  const dock = document.querySelector('.tech-dock');
  if (!trigger || !popover || !dock) return () => {};
  let opened = false;
  let pinned = false;
  let overTrigger = false;
  let overPopover = false;
  let restoringFocus = false;
  let closeTimer = 0;
  let positionFrame = 0;
  const owns = (node: EventTarget | null) => node instanceof Node && (trigger.contains(node) || popover.contains(node));
  const hasFocus = () => owns(document.activeElement);
  const clearClose = () => { clearTimeout(closeTimer); closeTimer = 0; };

  function close(restoreFocus = false) {
    clearClose();
    opened = false; pinned = false; overTrigger = false; overPopover = false;
    popover!.hidden = true;
    trigger!.setAttribute('aria-expanded', 'false');
    if (restoreFocus) {
      restoringFocus = true;
      trigger!.focus({ preventScroll: true });
      restoringFocus = false;
    }
  }
  function position() {
    if (!opened) return;
    const bounds = trigger!.getBoundingClientRect();
    const scrollBounds = dock!.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const viewportHeight = window.innerHeight;
    const visibleLeft = scrollBounds.width > 0 ? Math.max(0, scrollBounds.left) : 0;
    const visibleRight = scrollBounds.width > 0 ? Math.min(viewportWidth, scrollBounds.right) : viewportWidth;
    if (bounds.right <= visibleLeft || bounds.left >= visibleRight || bounds.bottom <= 0 || bounds.top >= viewportHeight) { close(); return; }
    const width = popover!.offsetWidth || 260;
    const height = popover!.offsetHeight || 132;
    const center = (Math.max(bounds.left, visibleLeft) + Math.min(bounds.right, visibleRight)) / 2;
    const left = Math.max(12, Math.min(center - width / 2, viewportWidth - width - 12));
    const top = Math.max(44, Math.min(bounds.top - height - 18, viewportHeight - height - 12));
    popover!.style.left = `${left}px`;
    popover!.style.top = `${top}px`;
  }
  function open() {
    if (restoringFocus) return;
    clearClose(); opened = true; popover!.hidden = false;
    trigger!.setAttribute('aria-expanded', 'true');
    position();
  }
  function queuePosition() {
    if (!opened) return;
    cancelAnimationFrame(positionFrame);
    positionFrame = requestAnimationFrame(position);
  }
  function queueClose() {
    clearClose();
    closeTimer = window.setTimeout(() => { if (!overTrigger && !overPopover && !pinned && !hasFocus()) close(); }, 200);
  }
  for (const [element, isTrigger] of [[trigger, true], [popover, false]] as const) {
    element.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      if (isTrigger) overTrigger = true; else overPopover = true;
      open();
    });
    element.addEventListener('pointerleave', () => {
      if (isTrigger) overTrigger = false; else overPopover = false;
      queueClose();
    });
    element.addEventListener('focusin', () => {
      if (restoringFocus) return;
      if (isTrigger) trigger.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'auto' });
      open();
    });
    element.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!hasFocus()) {
          pinned = false;
          if (!overTrigger && !overPopover) close();
        }
      }, 0);
    });
  }
  trigger.addEventListener('click', () => {
    if (pinned) close();
    else { pinned = true; open(); }
  });
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault(); open(); popover.querySelector('a')?.focus({ preventScroll: true });
    }
  });
  popover.addEventListener('click', event => { if ((event.target as Element).closest('a')) close(true); });
  const outside = (event: PointerEvent) => { if (opened && !owns(event.target)) close(); };
  const escape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && opened) {
      event.preventDefault(); event.stopImmediatePropagation(); close(true);
    }
  };
  document.addEventListener('pointerdown', outside, true);
  document.addEventListener('keydown', escape, true);
  dock.addEventListener('scroll', queuePosition, { passive: true });
  window.addEventListener('resize', queuePosition);
  window.addEventListener('scroll', queuePosition, { passive: true });
  return () => {
    document.removeEventListener('pointerdown', outside, true);
    document.removeEventListener('keydown', escape, true);
    dock.removeEventListener('scroll', queuePosition);
    window.removeEventListener('resize', queuePosition);
    window.removeEventListener('scroll', queuePosition);
  };
}
