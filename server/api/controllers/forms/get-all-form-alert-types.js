module.exports = {
  friendlyName: 'Get All Form Alert Types',

  description: 'Get All Form Alert Types',

  inputs: {
  },

  exits: {},

  fn: async function (_, exits) {
    return exits.success(await sails.helpers.forms.getAllFormAlertTypes());
  },
};

