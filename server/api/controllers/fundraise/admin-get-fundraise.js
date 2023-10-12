module.exports = {
  friendlyName: 'Get Fundraise Campaign object for admin purposes',

  description: 'Get Fundraise Campaign object for admin purposes',

  inputs: {
    id: {
      type: 'string',
      required: false,
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      if (id) {
        const data = await Fundraise.find({
          _id: id,
          isDeleted: false,
        });

        return exits.success(data);
      }
      const data = await Fundraise.find({
        isDeleted: false,
      });

      return exits.success(data);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
