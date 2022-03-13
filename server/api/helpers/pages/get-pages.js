const { DateTime } = require("luxon");
const he = require("he");

const transformPages = (pages) => {
  // TODO handle ACF pages
  return {
    id: pages.id,
    publishedDate: DateTime.fromISO(pages.date_gmt),
    slug: pages.slug,
    title: he.decode(pages.title.rendered),
    advancedFields: {
      youtubeUrl: pages.acf.youtube_link,
      sermonTitle: pages.acf.sermon_title,
      blurb: pages.acf.blurb,
      speakerName: pages.acf.pastor_name,
      date: pages.acf.date
        ? DateTime.fromFormat(pages.acf.date, "MMMM dd yyyy")
        : null,
      sermonNotesLink: pages.acf.sermon_notes_link,
      time: pages.acf.time,
      warning: pages.acf.warning,
    },
    protected: pages.content.protected,
    content: pages.content.rendered,
    status: pages.status,
  };
};

module.exports = {
  friendlyName: "Get all available Pages",

  description: "Get all available Pages",

  inputs: {},

  exits: {
    nonSuccess: {
      description: "Error",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.info(`Get pages..`);

    const key = "pages";
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info("Returning pages from cache");
      return exits.success(result);
    }

    sails.log.info(`Getting all pages..`);

    const url = sails.config.custom.pages.host;

    try {
      const data = await sails.helpers.getData(url);
      let transformedPages = data.map((s) => transformPages(s));

      if (transformedPages.length > 0) {
        sails.cache.set(key, transformedPages);
        sails.log.info("Cached announcements");
      }

      return exits.success(transformedPages);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
