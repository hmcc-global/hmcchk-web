module.exports = {
  friendlyName: 'Get Fundraise Campaign object for user purposes',

  description: 'Get Fundraise Campaign object for user purposes',

  inputs: {
    campaignName: {
      type: 'string',
      required: true,
    },
  },

  exits: {},

  fn: async function ({ campaignName }, exits) {
    try {
      const data = await Fundraise.find({
        campaignName,
        isDeleted: false,
      });

      return exits.success(data);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
