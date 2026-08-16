module.exports = {
  friendlyName: 'Get All Class Progress Statuses',

  description: 'Get All Class Progress Statuses',

  inputs: {
  },

  exits: {},

  fn: async function (_, exits) {
    return exits.success(sails.config.custom.classProgressStatuses);
  },
};