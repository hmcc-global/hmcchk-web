module.exports = {
  friendlyName: 'Get Harvest Games rankings',

  description: 'Get Harvest Games rankings',

  inputs: {
    lgRankingId: {
      required: false,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Harvest Games rankings returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve Harvest Games rankings',
    },
  },

  fn: async function ({ lgRankingId }, exits) {
    try {
      if (lgRankingId) {
        let data = await HGRankings.find({ _id: lgRankingId });
        if (data.length === 0) throw 'HG ranking not found';
        return exits.success(data);
      }

      let data = await HGRankings.find();
      sails.log.info('Retrieving Harvest Games rankings..');

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
