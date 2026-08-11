module.exports = {
  friendlyName: 'Get All Class Platform Types',

  description: 'Get All Class Platform Types',

  inputs: {
  },

  exits: {},

  fn: async function (_, exits) {
    return exits.success(
      await sails.helpers.classTrackingData.getAllClassPlatformTypes()
    );
  },
};