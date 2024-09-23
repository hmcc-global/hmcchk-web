module.exports = {
  friendlyName: 'Get all leadership teams',

  description:
    'Get all available leadership team entries if id is not specified',

  inputs: {
    id: {
      required: false,
      type: 'string',
      description: 'Id of leadership team entry',
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      const data = await LeadershipTeam.find({
        _id: id,
        isDeleted: false,
      });

      await sails.helpers.parseuserquery.parseUserQuery();
      // If no data is found return error
      if (data === null) return exits.error('unauthorized access');

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
