/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Call Parse User Query function',

  description: 'Call Parse User Query function',

  inputs: {
  },

  exits: {
    success: {
      description: 'Parse User success',
    },
    invalid: {
      description: 'Parse User failed',
    },
  },
  fn: async function (_, exits) {
    try {
      await sails.helpers.parseuserquery.parseUserQuery();
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};

