import { DateTime } from 'luxon';

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
