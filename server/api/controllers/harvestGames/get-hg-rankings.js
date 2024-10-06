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
      if (lgRankingId === 'AdminTest') {
        let data = await HGRankings.find().populateAll();
        if (data.length === 0) throw 'HG ranking not found';

        return exits.success(data);
      }

      let data = await HGRankings.find().populateAll();
      const filteredData = data.filter((entry) => entry.lgName !== 'password');
      sails.log.info('Retrieving Harvest Games rankings..');

      return exits.success(filteredData);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
