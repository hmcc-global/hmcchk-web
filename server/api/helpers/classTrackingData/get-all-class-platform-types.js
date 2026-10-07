module.exports = {
  friendlyName: 'Get All Class Platform Types',

  description: 'Get the list of platforms a class course can run on',

  inputs: {
  },

  exits: {},

  fn: async function (_, exits) {
    // Keeps its "platform types" name so the existing endpoint path is
    // unchanged; it now returns a plain list of platform names.
    return exits.success(sails.config.custom.classPlatforms);
  },
};