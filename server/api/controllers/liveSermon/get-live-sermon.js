const { DateTime } = require('luxon');

module.exports = {
  friendlyName: 'Get live sermon',

  description: 'Get live sermon',

  inputs: {
    sermonId: {
      required: false,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Live sermon returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve live sermon',
    },
  },
  fn: async function ({ sermonId }, exits) {
    try {
      // This is for AdminLiveSermonContainer to get sermon if there is one that exists
      if (sermonId) {
        let data = await LiveSermon.find({
          isDeleted: false,
        }).populateAll();
        if (data.length === 0) {
          return exits.success([]);
        }
        return exits.success(data);
      }

      const now = DateTime.fromISO(new Date().toISOString()).setZone(
        'Asia/Hong_Kong'
      );

      // This is for the rest to see the most updated sermon that is live
      let data = await LiveSermon.find({
        isDeleted: false,
        streamStartTime: { '<=': now.toISO() },
        streamEndTime: { '>=': now.toISO() },
      }).sort('updatedAt DESC');

      if (data && data[0]) {
        return exits.success(data);
      }
      return exits.success([]);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
