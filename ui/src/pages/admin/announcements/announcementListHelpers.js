import { DateTime } from 'luxon';

// Brand blue #4A6EEB darkened 7% (0.93x per channel) so white text clears
// WCAG AA: 5.0:1 here vs 4.45:1 on the raw brand hex.
export const BRAND_BLUE = '#4566DB';

export const toMillis = (value) => {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  const iso = DateTime.fromISO(value);
  if (iso.isValid) return iso.toMillis();
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? 0 : ms;
};

// Past list: newest ended first. Display end, then event end, then updated/created.
export const pastRecencyMs = (item) =>
  toMillis(item.displayEndDateTime) ||
  toMillis(item.eventEndDate) ||
  toMillis(item.updatedAt) ||
  toMillis(item.createdAt);

export const formatDisplayWindow = (item) => {
  const fmt = (value) => {
    if (!value) return null;
    const dt = DateTime.fromISO(value);
    return dt.isValid ? dt.toFormat('dd MMM yyyy, HH:mm') : value;
  };
  const start = fmt(item.displayStartDateTime);
  const end = fmt(item.displayEndDateTime);
  if (start && end) return `from ${start} to ${end}`;
  if (start) return `from ${start} (ongoing)`;
  if (end) return `until ${end}`;
  return 'no window set';
};
