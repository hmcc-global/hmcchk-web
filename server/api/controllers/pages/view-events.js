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
// A boundary close in the future still gets at least this much staleness;
// shorter than that is pointless churn for a church events page.
const MIN_CACHE_SECONDS = 30;
const MAX_CACHE_SECONDS = 10 * 60;

// Serves the SPA shell only while the SSR render is broken, so it needs just
// enough caching to stop a busy site from re-reading index.html on every hit.
const SHELL_TTL_SECONDS = 60;

const secondsUntil = (dateTime, now) =>
  Math.ceil(dateTime.diff(now, 'seconds').seconds);

// A recurring event's render date jumps to its next occurrence when one
// starts. Step the series start forward by the interval to find the next
// occurrence after `now`; occurrences past the series end don't count.
const nextRecurringBoundary = (event, now) => {
  const date = DateTime.fromISO(event.eventStartDate, {
    zone: 'Asia/Hong_Kong',
  });
  if (!date.isValid) return null;

  const time = DateTime.fromISO(event.eventStartTime, {
    zone: 'Asia/Hong_Kong',
  });
  const end = DateTime.fromISO(event.eventEndDate, { zone: 'Asia/Hong_Kong' });

  let step;
  if (event.eventInterval === 'Daily') step = { days: 1 };
  else if (event.eventInterval === 'Weekly') step = { days: 7 };
  else if (event.eventInterval === 'Monthly') step = { months: 1 };
  else return null;

  let boundary = time.isValid
    ? date.set({ hour: time.hour, minute: time.minute })
    : date.startOf('day');

  for (let i = 0; i < 400; i += 1) {
    if (end.isValid && boundary > end.endOf('day')) return null;
    if (boundary > now) return boundary;
    boundary = boundary.plus(step);
  }
  return null;
};

// The cached page must not outlive a change in what is visible: an event's
// display window opening or closing, its occurrence starting or ending (for
// recurring events the original dates are long past, so the next occurrence
// is what counts), or the HK day rolling over.
const cacheSeconds = (data) => {
  const now = DateTime.fromISO(data.now).setZone('Asia/Hong_Kong');
  if (!now.isValid) return MIN_CACHE_SECONDS;

  const boundaries = [now.endOf('day')];

  (Array.isArray(data.events) ? data.events : []).forEach((event) => {
    ['displayStartDateTime', 'displayEndDateTime'].forEach((key) => {
      const value = DateTime.fromISO(event[key]).setZone('Asia/Hong_Kong');
      if (value.isValid && value > now) boundaries.push(value);
    });

    if (event.eventInterval && event.eventInterval !== 'None') {
      const recurrence = nextRecurringBoundary(event, now);
      if (recurrence) boundaries.push(recurrence);
    }

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

  // reduce over Math.min.apply: apply hits the argument limit on long lists.
  const untilNextBoundary = boundaries.reduce(
    (earliest, boundary) => Math.min(earliest, secondsUntil(boundary, now)),
    Infinity
  );

  return Math.max(
    MIN_CACHE_SECONDS,
    Math.min(MAX_CACHE_SECONDS, untilNextBoundary)
  );
};

// Single-flight: requests that miss the cache together share one render
// instead of each rendering the whole React tree. A race winner's `finally`
// clears the slot before losers finish awaiting the promise.
let renderInFlight = null;

// The SPA shell fallback is cached in process: a broken SSR should still
// serve fast and without disk I/O on every request.
let shellFallback = null;
let shellFallbackExpiresAt = 0;

const readShell = async () => {
  const nowMs = Date.now();
  if (shellFallback && nowMs < shellFallbackExpiresAt) return shellFallback;

  const shell = await fs.readFile(INDEX_HTML_PATH, 'utf8');
  shellFallback = shell;
  shellFallbackExpiresAt = nowMs + SHELL_TTL_SECONDS * 1000;
  return shell;
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

      if (!renderInFlight) {
        renderInFlight = (async () => {
          const announcements =
            await sails.helpers.announcements.findPublished();

          const data = {
            now: new Date().toISOString(),
            events: announcements,
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

          return page;
        })().finally(() => {
          renderInFlight = null;
        });
      }

      return sendPage(await renderInFlight);
    } catch (err) {
      sails.log.warn(
        `Events page SSR failed, serving the SPA shell instead: ${err.message}`
      );
      try {
        return sendPage(await readShell());
      } catch (readErr) {
        sails.log.error(
          `Could not read the SPA shell for /events: ${readErr.message}`
        );
        return res.serverError();
      }
    }
  },
};
