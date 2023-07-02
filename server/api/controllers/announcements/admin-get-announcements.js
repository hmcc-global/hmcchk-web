module.exports = {
  friendlyName: 'Get all available Announcement for admin use',

  description:
    'Get all available Announcements if id is not specified. Otherwise, finds a specific one',

  inputs: {
    id: {
      required: false,
      type: 'string',
      description: 'Id of announcement',
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      const data = await Announcement.find({
        _id: id,
        isDeleted: false,
      });

      // If no form is found return error
      if (data === null) return exits.error('unauthorized access');

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
