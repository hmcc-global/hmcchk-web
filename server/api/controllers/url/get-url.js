module.exports = {
  friendlyName: 'Get all or specific URL for admin use',

  description:
    'Gets all url if id is not specified, finds a specific one otherwise',

  inputs: {
    id: {
      type: 'string',
      description: 'Id of url',
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      const data = await Url.find({
        _id: id,
        isDeleted: false,
      });

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
