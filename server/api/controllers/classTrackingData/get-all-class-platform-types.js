module.exports = {
  friendlyName: 'Get All Class Platform Types',

  description: 'Get the list of platforms a class course can run on',

  inputs: {
  },

  exits: {},

  fn: async function (_, exits) {
    return exits.success(
      await sails.helpers.classtrackingdata.getAllClassPlatformTypes()
    );
  },
};