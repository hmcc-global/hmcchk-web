const { DateTime } = require('luxon');
const he = require('he');

const transformAnnouncement = (announce) => {
  return {
    id: announce.id,
    slug: announce.slug,
    title : he.decode(announce.title.rendered),
    startDate: DateTime.fromFormat(announce.date, "LLLL MM dd yyyy"),
    endDate: DateTime.fromHTTP(announce.end_date),
    recurrence: announce.recurrence_interval,
    imageUrl: announce.image,
    description: he.decode(announce.content.rendered),
    time: DateTime.fromFormat(announce.time, "t").toFormat("t"),
    location: announce.location,
    mapLink: announce.map,
    signUpLink: announce.sign_up,
    status: announce.status
  };
};

module.exports = {

  friendlyName: 'Get all available Announcements',

  description: 'Get all available Announcements',

  inputs: {},

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.info(`Getting all announcements..`);

    const url = sails.config.custom.announcements.host;

    try {
      const data = await sails.helpers.getData(url);
      let transformedAnnouncements = data.map((a) => transformAnnouncement(a));

      return exits.success(transformedAnnouncements);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }

};
