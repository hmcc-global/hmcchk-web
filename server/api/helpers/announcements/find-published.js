// The visibility rule for announcements shown on the public site. Shared by the
// public API and the server-rendered events page so they cannot disagree.
module.exports = {
  friendlyName: 'Find published announcements',

  description: 'Find announcements visible on the public site',

  inputs: {
    criteria: {
      type: 'json',
      defaultsTo: {},
      description: 'Extra query criteria, e.g. { _id: id }',
    },
  },

  exits: {
    success: {
      description: 'The matching announcements',
    },
    error: {
      description: 'The query failed',
    },
  },

  fn: async function ({ criteria }, exits) {
    try {
      const data = await Announcement.find({
        ...criteria,
        isInWeb: true,
        isPublished: true,
        isDeleted: false,
      });

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
