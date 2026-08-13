module.exports = {
  friendlyName: 'Get All Class Progress Statuses',

  description: 'Get All Class Progress Statuses',

  inputs: {
  },

  exits: {},

  fn: async function (_, exits) {
    return exits.success(
      await sails.helpers.classtrackingdata.getAllClassProgressStatuses()
    );
  },
};