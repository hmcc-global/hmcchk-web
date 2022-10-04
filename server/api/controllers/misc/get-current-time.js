module.exports = {
  friendlyName: 'Return server current time',

  description: 'Return server current time',

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    const now = new Date().toISOString();
    return exits.success(now);
  },
};

