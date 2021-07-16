const { DateTime } = require('luxon');
const he = require('he');

const transformAnnouncement = (announce) => {
  return {
    id: announce.id,
    slug: announce.slug,
    title : he.decode(announce.title.rendered),
    startDate: DateTime.fromFormat(announce.acf.date, "ccc MM dd yyyy").toFormat("MM dd yyyy"),
    endDate: DateTime.fromFormat(announce.acf.end_date, "ccc MM dd yyyy").toFormat("MM dd yyyy"),
    recurrence: announce.acf.recurrence_interval,
    imageUrl: announce.acf.image,
    description: he.decode(announce.content.rendered),
    time: DateTime.fromFormat(announce.acf.time, "t").toFormat("t"),
    location: announce.acf.location,
    mapLink: announce.acf.map,
    signUpLink: announce.acf.sign_up,
    status: announce.status
  };
};

module.exports = {

  friendlyName: 'Get all available Announcements',

  description: 'Get all available Announcements',

  inputs: {},

  exits: {
    nonSuccess: {
      description: 'Error'
    },
  },

  fn: async function(inputs, exits) {
    sails.log.info(`Get announcements..`);

    const key = 'announcements';
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info('Returning announcements from cache');
      return exits.success(result);
    }

    sails.log.info(`Getting all announcements..`);

    const url = sails.config.custom.announcements.host;

    try {
      const data = await sails.helpers.getData(url);
      let transformedAnnouncements = data.map((s) => transformAnnouncement(s));

      if (transformedAnnouncements.length > 0) {
        sails.cache.set(key, transformedAnnouncements);
        sails.log.info('Cached announcements');
      }

      return exits.success(transformedAnnouncements);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  }

};
