const timeZone = 'America/Toronto';
const dateFormatter = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', month: 'short', day: 'numeric' });
const timeFormatter = new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true });
const accessibleDateFormatter = new Intl.DateTimeFormat('en-US', { timeZone, dateStyle: 'full' });

function partsByType(formatter: Intl.DateTimeFormat, date: Date) {
  return Object.fromEntries(formatter.formatToParts(date).map(part => [part.type, part.value])) as Record<string, string>;
}

export interface MenuClock { dateText: string; timeText: string; iso: string; accessibleLabel: string }

/** Format a moment for the menu bar, always in Toronto time. */
export function formatMenuClock(date: Date | number = new Date()): MenuClock {
  const instant = new Date(date);
  if (Number.isNaN(instant.getTime())) throw new RangeError('formatMenuClock requires a valid date.');
  const dateParts = partsByType(dateFormatter, instant);
  const timeParts = partsByType(timeFormatter, instant);
  const timeText = `${timeParts.hour}:${timeParts.minute} ${timeParts.dayPeriod}`;
  return {
    dateText: `${dateParts.weekday} ${dateParts.month} ${dateParts.day}`,
    timeText,
    iso: instant.toISOString(),
    accessibleLabel: `${accessibleDateFormatter.format(instant)} at ${timeText}, Toronto time`,
  };
}
