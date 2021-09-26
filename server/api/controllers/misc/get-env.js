module.exports = {
  friendlyName: "Returns environment mode",

  description: "Return environment mode",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    return exits.success(sails.config.environment);
  },
};
