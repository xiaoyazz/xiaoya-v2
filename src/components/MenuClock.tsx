import { useTorontoClock } from '../hooks/useTorontoClock';

export function MenuClock() {
  const clock = useTorontoClock();
  return (
    <time className="menu-clock" id="menu-clock" title="Toronto time" dateTime={clock.iso} aria-label={clock.accessibleLabel}>
      <span className="clock-date">{clock.dateText}</span>
      <span className="clock-time">{clock.timeText}</span>
      <span className="clock-zone">Toronto</span>
    </time>
  );
}
