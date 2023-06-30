module.exports = {
  friendlyName: 'Get offsetted time',

  description: 'Get offsetted time in the server timezone',

  inputs: {
    datetime: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error',
    },
  },

  fn: async function (inputs, exits) {
    try {
      let adjustedTime = new Date();
      // -480 is GMT+8 offset
      adjustedTime.setTime(inputs.datetime.getTime() + 480 * 60000);

      return exits.success(adjustedTime);
    } catch (err) {
      console.log(err);
      return exits.nonSuccess(err);
    }
  },
};
