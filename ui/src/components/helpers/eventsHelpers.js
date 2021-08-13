import { DateTime } from "luxon";

const getRenderDate = (startDate, endDate, interval) => {
  let start = DateTime.fromISO(startDate);
  let end = DateTime.fromISO(endDate);

  let diffInDays = end.diff(start, "days").toObject();
  let nRecurrence = Math.floor(diffInDays.days / interval);

  let renderDate = startDate;

  for (let i = 0; i <= nRecurrence; i++) {
    renderDate = start.plus({ days: interval * i });
    if (DateTime.now() < renderDate) break;
  }
  return renderDate;
};

const filterISOStringForGoogleCalendar = (isoString) => {
  return isoString.split(".")[0].replaceAll(/\b(?:-|:)\b/gi, "");
};

const generateGoogleCalendarLink = (eventData) => {
  if (!eventData.time || !eventData.title) return false;
  let eventTime = eventData.time;
  const baseLink = "https://calendar.google.com/calendar/r/eventedit?";
  const eventTitle = "text=" + encodeURIComponent(eventData.title);

  if (!eventData.renderDate) {
    eventData.renderDate = getRenderDate(
      eventData.startDate,
      eventData.endDate,
      eventData.recurrence
    );
  }

  let eventDate = DateTime.fromISO(eventData.renderDate.toISO());

  let parsed = DateTime.fromFormat(eventTime, "hh:mm a");
  let today = DateTime.now().startOf("day");
  let timeOfDay = parsed.diff(today);

  eventDate = eventDate.plus(timeOfDay);

  let startTime = filterISOStringForGoogleCalendar(eventDate.toISO());
  let endTime = eventDate.plus({ hours: 2 });
  endTime = filterISOStringForGoogleCalendar(endTime.toISO());

  const dates = "&dates=" + encodeURIComponent(startTime + "/" + endTime);

  const ctz = "&ctz=" + encodeURIComponent("Asia/Hong_Kong");
  const location = "&location=" + encodeURIComponent(eventData.location);
  const linkComponents = [baseLink, eventTitle, dates, ctz, location];

  return linkComponents.join("");
};

export {
  getRenderDate,
  filterISOStringForGoogleCalendar,
  generateGoogleCalendarLink,
};
