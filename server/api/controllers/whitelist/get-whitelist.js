module.exports = {
  friendlyName: 'Get whitelist',

  description:
    'Retrieves the list of whitelists that exist if id is not specified, finds a specific whitelist entry otherwise',

  inputs: {
    id: {
      type: 'string',
      description: 'Id of whitelist entry',
      required: false,
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      const data = await Whitelist.find({
        _id: id,
      });
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
