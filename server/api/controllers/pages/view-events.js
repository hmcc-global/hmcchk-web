const path = require('path');
const fs = require('fs').promises;
const { DateTime } = require('luxon');

const INDEX_HTML_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'client',
  'index.html'
);
const MIN_CACHE_SECONDS = 30;
const MAX_CACHE_SECONDS = 10 * 60;

// Only what the events page renders. The rest of the record (submitter and
// approver names, PPT flags, form ids) must not reach the public HTML.
const PUBLIC_EVENT_FIELDS = [
  'id',
  'title',
  'description',
  'imageAdUrl',
  'displayStartDateTime',
  'displayEndDateTime',
  'eventStartDate',
  'eventStartTime',
  'eventEndDate',
  'eventEndTime',
  'eventInterval',
  'eventType',
  'featured',
  'location',
  'signUpUrl',
];

const toPublicEvent = (event) =>
  PUBLIC_EVENT_FIELDS.reduce((publicEvent, field) => {
    if (event[field] !== undefined) publicEvent[field] = event[field];
    return publicEvent;
  }, {});

const secondsUntil = (dateTime, now) =>
  Math.ceil(dateTime.diff(now, 'seconds').seconds);

// The cached page must not outlive a change in what is visible: an event's
// display window opening or closing, its next occurrence starting or ending,
// or the HK day rolling over.
const cacheSeconds = (data) => {
  const now = DateTime.fromISO(data.now).setZone('Asia/Hong_Kong');
  if (!now.isValid) return MIN_CACHE_SECONDS;

  const boundaries = [now.endOf('day')];

  data.events.forEach((event) => {
    ['displayStartDateTime', 'displayEndDateTime'].forEach((key) => {
      const value = DateTime.fromISO(event[key]).setZone('Asia/Hong_Kong');
      if (value.isValid && value > now) boundaries.push(value);
    });

    // A recurring event moves to its next occurrence at each start time, and
    // stops being listed once its end time passes.
    ['eventStartDate', 'eventEndDate'].forEach((key) => {
      const date = DateTime.fromISO(event[key], { zone: 'Asia/Hong_Kong' });
      if (!date.isValid) return;

      const time = DateTime.fromISO(event[`${key.replace('Date', 'Time')}`], {
        zone: 'Asia/Hong_Kong',
      });
      const boundary = time.isValid
        ? date.set({ hour: time.hour, minute: time.minute })
        : date.startOf('day');

      if (boundary > now) boundaries.push(boundary);
    });
  });

  const untilNextBoundary = Math.min.apply(
    null,
    boundaries.map((boundary) => secondsUntil(boundary, now))
  );

  return Math.max(
    MIN_CACHE_SECONDS,
    Math.min(MAX_CACHE_SECONDS, untilNextBoundary)
  );
};

module.exports = {
  friendlyName: 'View events page',

  description:
    'Serve /events rendered on the server, falling back to the SPA shell',

  inputs: {},

  exits: {},

  fn: async function () {
    const { req, res } = this;
    const cacheKey = sails.config.custom.eventsPageCacheKey;

    const sendPage = (page) => {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.type('html');
      return res.send(page);
    };

    try {
      const cachedPage = sails.cache.get(cacheKey);
      if (cachedPage) return sendPage(cachedPage);

      const announcements = await sails.helpers.announcements.findPublished();

      const data = {
        now: new Date().toISOString(),
        events: announcements.map(toPublicEvent),
      };

      const { page } = await sails.helpers.pages.renderEventsPage.with({
        pathname: req.path,
        data,
      });

      // Caching is an optimisation: a cache failure must not throw away a page
      // that rendered fine.
      try {
        sails.cache.set(cacheKey, page, cacheSeconds(data));
      } catch (cacheErr) {
        sails.log.warn(
          `Could not cache the events page: ${cacheErr.message}`
        );
      }

      return sendPage(page);
    } catch (err) {
      sails.log.warn(
        `Events page SSR failed, serving the SPA shell instead: ${err.message}`
      );
      try {
        const shell = await fs.readFile(INDEX_HTML_PATH, 'utf8');
        return sendPage(shell);
      } catch (readErr) {
        sails.log.error(
          `Could not read the SPA shell for /events: ${readErr.message}`
        );
        return res.serverError();
      }
    }
  },
};
