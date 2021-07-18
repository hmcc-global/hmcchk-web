const FAST_TRIES = 18;
const TRY_TIMEOUT = 10 * 60 * 1000; // 10 mins
const MAX_TRIES = FAST_TRIES * 3;
const SLOW_TIMEOUT = TRY_TIMEOUT * 3;

const retryUntilSuccess = async (cacheName, toTry, checkFunc, tries = 1) => {
  if (tries <= MAX_TRIES) {
    try {
      const result = await toTry();
      if (!checkFunc(result)) {
        throw "retry";
      }
      sails.log.info(`Loaded ${cacheName}`);
    } catch (unusedErr) {
      const timeout = tries < FAST_TRIES ? TRY_TIMEOUT : SLOW_TIMEOUT;
      sails.log.info(
        `Failed to load ${cacheName} (try ${tries} out of ${MAX_TRIES}), will retry after ${
          timeout / 1000
        } secs`
      );
      setTimeout(
        async () =>
          await retryUntilSuccess(cacheName, toTry, checkFunc, tries + 1),
        timeout
      );
    }
  } else {
    sails.log.error(
      `Failed to retrieve cache for ${cacheName}. Please investigate...`
    );
  }
};

module.exports = {
  friendlyName: "cache latest data",

  description: "Store latest data in cache",

  inputs: {},

  exits: {
    nonSuccess: {
      description: "Error",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.info(`System: Attempting to store latest data in cache`);

    let pSpeakers = await retryUntilSuccess(
      "Speakers",
      () => sails.helpers.sermons.getSpeakers(),
      (result) => result.length > 0
    );

    let pMedia = await retryUntilSuccess(
      "Media",
      () => sails.helpers.media.getMedia(),
      (result) => result.length > 0
    );

    let pSermonSeries = await retryUntilSuccess(
      "Sermon Series",
      () => sails.helpers.sermons.getSermonSeries(),
      (result) => result.length > 0
    );

    let pServiceTypes = await retryUntilSuccess(
      "Service Types",
      () => sails.helpers.sermons.getServiceTypes(),
      (result) => result.length > 0
    );

    let pSermons = await retryUntilSuccess(
      "Sermons",
      () => sails.helpers.sermons.getSermons(),
      (result) => result.length > 0
    );

    let pAnnouncements = retryUntilSuccess(
      "Announcements",
      () => sails.helpers.announcements.getAnnouncements(),
      (result) => result.length > 0
    );

    return exits.success("Cache function");
  },
};
