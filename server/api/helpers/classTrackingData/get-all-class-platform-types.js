module.exports = {
  friendlyName: 'Get All Class Platform Types',

  description: 'Get All Class Platform Types',

  inputs: {
  },

  exits: {},

  fn: async function (_, exits) {
    return exits.success(sails.config.custom.classPlatformTypes);
  },
};