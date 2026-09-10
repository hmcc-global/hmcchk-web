import { DateTime } from 'luxon';
import { Text, Icon } from 'components';
import { RiCalendarEventFill } from 'react-icons/ri';

const getStartDate = (eventData) => {
  return eventData.renderDate
    ? eventData.renderDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
    : getRenderDate(
        eventData.startDate,
        eventData.endDate,
        eventData.recurrence
      ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
};

const getRenderDate = (startDate, endDate, interval, startTime) => {
  // parse the interval to number
  const start = DateTime.fromISO(startDate).startOf('day');
  const end = DateTime.fromISO(endDate);
  const recur =
    interval === 'Daily'
      ? 1
      : interval === 'Weekly'
      ? 7
      : interval === 'Monthly'
      ? start.daysInMonth
      : interval === 'None'
      ? 0
      : 0;

  const nRecurrence =
    recur !== 0 ? Math.floor(end.diff(start, 'days').days / recur) : 0;

  // offset of the event time from midnight (ms); 0 when no startTime is given
  const timeOffset =
    startTime !== '' && startTime !== undefined
      ? DateTime.fromISO(startTime) - DateTime.fromISO('00:00')
      : 0;

  /* pick the first occurrence that is still in the future; the time offset is
     re-applied each iteration so every occurrence keeps the event time.
     on the event's own day before the start time, today counts as upcoming;
     once the start time passes, it advances to the next occurrence */
  for (let i = 0; i <= nRecurrence; i++) {
    const occurrence = start.plus({
      days: recur * i,
      milliseconds: timeOffset,
    });
    if (DateTime.now() < occurrence) return occurrence;
  }
  /* every occurrence has passed: show the last one. when the dates make
     nRecurrence invalid (NaN/negative, e.g. missing endDate) fall back to
     the first occurrence, like the old loop that never ran */
  if (nRecurrence > 0) {
    return start.plus({ days: recur * nRecurrence, milliseconds: timeOffset });
  }
  return start.plus({ milliseconds: timeOffset });
};

const generateGoogleCalendarLink = (eventData) => {
  /* no time on the event means an all-day render; no title means nothing
     to put on the calendar — skip the link in either case */
  if (!eventData.eventStartTime || !eventData.title) return null;
  const baseLink = 'https://calendar.google.com/calendar/r/eventedit?';
  const eventTitle = 'text=' + encodeURIComponent(eventData.title);

  // use the page-computed renderDate when present; fallback computes it from the event dates
  const renderDate = eventData.renderDate
    ? eventData.renderDate
    : getRenderDate(
        eventData.eventStartDate,
        eventData.eventEndDate,
        eventData.eventInterval
      );

  // calculate the start and end times
  const start = DateTime.fromISO(eventData.eventStartTime);
  const end = eventData.eventEndTime
    ? DateTime.fromISO(eventData.eventEndTime)
    : start.plus({ hours: 2 });

  const eventDate = renderDate.set({
    hour: start.hour,
    minute: start.minute,
    second: start.second,
  });
  let eventEndDate = eventDate.set({
    hour: end.hour,
    minute: end.minute,
    second: end.second,
  });

  /* an end at or before the start (eventEndTime === eventStartTime, or
     '00:00' on an event running to midnight) yields a zero/negative-length
     event that Google rejects — default to a 2-hour duration instead */
  if (eventEndDate <= eventDate) {
    eventEndDate = eventDate.plus({ hours: 2 });
  }

  // Google Calendar's dates param expects YYYYMMDDTHHMMSS
  const dates =
    '&dates=' +
    encodeURIComponent(
      eventDate.toFormat("yyyyMMdd'T'HHmmss") +
        '/' +
        eventEndDate.toFormat("yyyyMMdd'T'HHmmss")
    );

  // ensure the calendar entry is pinned to Hong Kong time zone
  const ctz = '&ctz=' + encodeURIComponent('Asia/Hong_Kong');
  const location = '&location=' + encodeURIComponent(eventData.location);
  const linkComponents = [baseLink, eventTitle, dates, ctz, location];

  return linkComponents.join('');
};

const EndDateElement = ({
  startDateStr,
  endDateStr,
  interval,
  isModal = false,
}) => {
  if (
    !startDateStr ||
    startDateStr === '' ||
    !endDateStr ||
    endDateStr === ''
  ) {
    return;
  }

  const renderDate = getRenderDate(startDateStr, endDateStr, interval);
  const endDate = DateTime.fromISO(endDateStr);

  if (!renderDate.isValid || !endDate.isValid || renderDate.equals(endDate))
    return;

  return (
    <Text fontSize={['sm', isModal ? 'md' : 'lg']} fontWeight="bold">
      <Icon mr={2} as={RiCalendarEventFill} />
      End Date: {endDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
    </Text>
  );
};

// Canonical event ordering (all surfaces):
// 1. Featured first — featured+Resources events rank as featured (intentional)
// 2. renderDate ascending; empty renderDate sorts last
// 3. Resources events last
// Pure: returns a new sorted array, does not mutate the input.
const sortEvents = (events) => {
  return [...events].sort((a, b) => {
    const hasResourcesA = a.eventType?.some(
      (type) => type.value === 'Resources'
    );
    const hasResourcesB = b.eventType?.some(
      (type) => type.value === 'Resources'
    );

    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    if (hasResourcesA && !hasResourcesB) return 1;
    if (!hasResourcesA && hasResourcesB) return -1;

    if (a.renderDate === '') return 1;
    if (b.renderDate === '') return -1;
    return a.renderDate < b.renderDate ? -1 : 1;
  });
};

export {
  getStartDate,
  getRenderDate,
  generateGoogleCalendarLink,
  EndDateElement,
  sortEvents,
};
