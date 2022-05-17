module.exports = {
  friendlyName: 'Create a new whitelist',

  description: 'Create a whitelist entry',

  inputs: {
    eventName: {
      type: 'string',
      required: true,
      description: 'The name of the event for which this whitelist is for',
    },
    data: {
      type: 'json',
      required: true,
      description:
        'Any data that you would like to store as the whitelist for this event',
    },
  },

  exits: {},

  fn: async function ({ eventName, data }, exits) {
    try {
      await Whitelist.create({ eventName: eventName, data: data });
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
