const { DateTime } = require('luxon');

module.exports = {
  friendlyName: 'Get all latest leadership teams',

  description:
    'Get all latest leadership teams',

  inputs: {
    includeDeleted: {
      required: false,
      type: 'boolean',
      default: false
    }
  },

  exits: {},

  fn: async function ({ includeDeleted }, exits) {
    const now = DateTime.fromISO(new Date().toISOString()).setZone(
      'Asia/Hong_Kong'
    );

    try {
      const data = await LeadershipTeam.find({
        isDeleted: includeDeleted,
        seasonFrom: { '<=': now.toISODate() },
        seasonTo: { '>=': now.toISODate() }
      });

      if (data === null) return exits.error('Unexpected');

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
