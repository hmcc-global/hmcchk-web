const { DateTime } = require('luxon');

module.exports = {
  friendlyName: 'Get Latest Sermon Notes Parent of today',

  description: 'Get Latest Sermon Notes Parent of today',

  inputs: {
  },

  exits: {
    success: {
      description: 'Latest Sermon notes parent returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve Latest Sermon notes parent',
    },
  },
  fn: async function (_, exits) {
    const today = DateTime.now().startOf('day');
    try {
      const data = await SermonNotesParent.find({
        where: {
          isDeleted: false,
          isPublished: true,
          date: today.toFormat('yyyy-MM-dd')
        },
        sort: [
          { sermonId: 'DESC'}
        ]
      });
      // eslint-disable-next-line eqeqeq
      return exits.success(data != null && data[0] != null ? data[0].sermonId : null);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};

