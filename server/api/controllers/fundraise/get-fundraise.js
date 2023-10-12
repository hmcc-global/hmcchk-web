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
      if (campaignName) {
        const data = await Fundraise.find({
          campaignName,
          isDeleted: false,
        });

        return exits.success(data);
      }
      return exits.invalid('Missing required field: campaignName');
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
