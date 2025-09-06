/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Trigger Send Batch Users',

  description: 'Trigger Send Batch Users',

  inputs: {
  },

  exits: {
    success: {
      description: 'Send Batch Users query success',
    },
    invalid: {
      description: 'Send Batch Users query failed',
    },
  },
  fn: async function (_, exits) {
    try {
      await sails.helpers.parseuserquery.sendBatchUsersQuery();
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};


