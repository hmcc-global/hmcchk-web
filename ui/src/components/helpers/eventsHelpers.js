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

export { getRenderDate };
