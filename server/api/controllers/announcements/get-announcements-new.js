module.exports = {
  friendlyName: 'Get all available Announcement for public use',

  description:
    'Get all available Announcements if id is not specified. Otherwise, finds a specific one',

  inputs: {
    id: {
      required: false,
      type: 'string',
      description: 'Id of announcement',
    },
  },

  exits: {
    notFound: {
      description: 'No published announcement with this id',
      responseType: 'notFound',
    },
  },

  fn: async function ({ id }, exits) {
    try {
      const data = await sails.helpers.announcements.findPublished.with({
        criteria: id ? { _id: id } : {},
      });

      if (id && data.length === 0) return exits.notFound();

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
