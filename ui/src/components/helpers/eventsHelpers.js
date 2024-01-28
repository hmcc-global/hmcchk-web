import { DateTime } from 'luxon';
import { Text, Icon } from '@chakra-ui/react';
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
  let start = DateTime.fromISO(startDate);
  let end = DateTime.fromISO(endDate);
  let recur =
    interval === 'Daily'
      ? 1
      : interval === 'Weekly'
      ? 7
      : interval === 'Monthly'
      ? start.daysInMonth
      : interval === 'None'
      ? 0
      : 0;

  let diffInDays = end.diff(start, 'days').toObject();
  let nRecurrence = recur !== 0 ? Math.floor(diffInDays.days / recur) : 0;

  let renderDate = startDate;

  //if there is a set time, add the interval after the event time
  if (startTime !== '' && startTime !== undefined) {
    renderDate = start.plus(
      DateTime.fromISO(startTime) - DateTime.fromISO('00:00')
    );
  }

  if (nRecurrence === 0) return renderDate;

  for (let i = 0; i <= nRecurrence; i++) {
    if (DateTime.now() < renderDate) break;
    renderDate = start.plus({ days: recur * i });
  }
  return renderDate;
};

const filterISOStringForGoogleCalendar = (isoString) => {
  return isoString.split('.')[0].replaceAll(/\b(?:-|:)\b/gi, '');
};

const generateGoogleCalendarLink = (eventData) => {
  if (
    !eventData.eventStartTime ||
    !eventData.title ||
    eventData.eventStartTime === '' ||
    eventData.eventStartTime === undefined
  )
    return null;
  let eventTime = eventData.eventStartTime;
  const baseLink = 'https://calendar.google.com/calendar/r/eventedit?';
  const eventTitle = 'text=' + encodeURIComponent(eventData.title);

  if (!eventData.renderDate) {
    eventData.renderDate = getRenderDate(
      eventData.eventStartDate,
      eventData.eventEndDate,
      eventData.eventInterval
    );
  }

  let eventDate = DateTime.fromISO(eventData.renderDate.toISO());

  eventDate = eventDate.plus(DateTime.fromISO(eventTime) - DateTime.fromISO('00:00'));

  let startTime = filterISOStringForGoogleCalendar(eventDate.toISO());
  let endTime = eventDate.plus({ hours: 2 });
  endTime = filterISOStringForGoogleCalendar(endTime.toISO());

  const dates = '&dates=' + encodeURIComponent(startTime + '/' + endTime);

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

export {
  getStartDate,
  getRenderDate,
  filterISOStringForGoogleCalendar,
  generateGoogleCalendarLink,
  EndDateElement,
};
