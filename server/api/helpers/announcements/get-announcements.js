const { DateTime } = require("luxon");
const he = require("he");

const transformAnnouncement = (announcement) => {
  let parsedStartDateStr = announcement.acf.date
    ? announcement.acf.date.split(" ").pop()
    : null;
  let parsedEndDateStr = announcement.acf.end_date
    ? announcement.acf.end_date.split(" ").pop()
    : null;

  return {
    id: announcement.id,
    slug: announcement.slug,
    title: he.decode(announcement.title.rendered),
    startDate: parsedStartDateStr
      ? DateTime.fromFormat(parsedStartDateStr, "M/dd/yyyy")
      : null,
    endDate: parsedEndDateStr
      ? DateTime.fromFormat(parsedEndDateStr, "M/dd/yyyy")
      : null,
    recurrence: announcement.acf.recurrence_interval
      ? parseInt(announcement.acf.recurrence_interval)
      : null,
    imageUrl: announcement.acf.image,
    description: he.decode(announcement.content.rendered),
    time: announcement.acf.time
      ? DateTime.fromFormat(announcement.acf.time, "h:mm a").toFormat("h:mm a")
      : null,
    location: announcement.acf.location,
    mapLink: announcement.acf.map,
    signUpLink: announcement.acf.sign_up,
    status: announcement.status,
  };
};

module.exports = {
  friendlyName: "Get all available Announcements",

  description: "Get all available Announcements",

  inputs: {},

  exits: {
    nonSuccess: {
      description: "Error",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.info(`Get announcements..`);

    const key = "announcements";
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info("Returning announcements from cache");
      return exits.success(result);
    }

    sails.log.info(`Getting all announcements..`);

    const url = sails.config.custom.posts.host;

    try {
      const data = await sails.helpers.getData(url, {
        // 2 is the category id for Announcements in WP
        categories: 2
      });
      let transformedAnnouncements = data.map((s) => transformAnnouncement(s));

      if (transformedAnnouncements.length > 0) {
        sails.cache.set(key, transformedAnnouncements);
        sails.log.info("Cached announcements");
      }

      return exits.success(transformedAnnouncements);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
