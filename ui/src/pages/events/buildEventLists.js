import { DateTime } from 'luxon';
import { getRenderDate, sortEvents } from 'utils/eventsHelpers';
import isDateInThisWeek from './getWeek';

const emptyEventLists = () => ({
  eventsList: [],
  thisWeekList: [],
  featuredList: [],
  tagList: [],
});

// Shared by the browser fetch and the server render so both produce the same
// lists for the same records and the same `now`.
const buildEventLists = (events, now) => {
  const tagList = new Set();
  const visibleEvents = (Array.isArray(events) ? events : [])
    .filter((item) => {
      if (item.displayStartDateTime) {
        const displayStartDate = DateTime.fromISO(item.displayStartDateTime);
        if (displayStartDate > now) return false;
      }

      if (item.displayEndDateTime !== '') {
        const endDate = DateTime.fromISO(item.displayEndDateTime);
        const startDate = DateTime.fromISO(item.displayStartDateTime);
        return endDate > now && now > startDate;
      }
      return false;
    })
    .map((item) => ({
      ...item,
      renderDate: getRenderDate(
        item.eventStartDate,
        item.eventEndDate,
        item.eventInterval,
        item.eventStartTime,
        now
      ),
    }));

  const sorted = sortEvents(visibleEvents);
  sorted.forEach((item) => {
    item.eventType?.forEach((tag) => tagList.add(tag.value));
  });

  const featuredList = [];
  const thisWeekList = [];
  const moreFilterEvents = [];

  sorted.forEach((item) => {
    if (item.featured) {
      featuredList.push(item);
    }
    if (
      isDateInThisWeek(item.eventStartDate, now) ||
      isDateInThisWeek(item.eventEndDate, now) ||
      isDateInThisWeek(item.renderDate, now)
    ) {
      thisWeekList.push(item);
    } else {
      moreFilterEvents.push(item);
    }
  });

  const eventsList = [
    ...new Set(featuredList.concat(thisWeekList, moreFilterEvents)),
  ];

  return {
    eventsList,
    thisWeekList,
    featuredList,
    tagList: [...tagList],
  };
};

export { emptyEventLists };
export default buildEventLists;
