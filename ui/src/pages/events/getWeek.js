import { DateTime } from 'luxon';

const toDateTime = (value) => {
  if (DateTime.isDateTime(value)) return value;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return DateTime.fromJSDate(parsed);
};

export default function isDateInThisWeek(value, now = DateTime.now()) {
  const eventDate = toDateTime(value);
  if (!eventDate) return false;

  // weekday is 1 for Monday, matching the old Date-based start of week
  const firstDayOfWeek = now.startOf('day').minus({ days: now.weekday - 1 });
  const lastDayOfWeek = firstDayOfWeek.plus({ days: 6 });

  return (
    eventDate.startOf('day') >= firstDayOfWeek &&
    eventDate.startOf('day') <= lastDayOfWeek
  );
}
