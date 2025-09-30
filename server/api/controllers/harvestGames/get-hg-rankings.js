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
      // To allow admin to view all data including password but not deleted entries
      if (lgRankingId === 'AdminTest') {
        let data = await HGRankings.find().populateAll();
        data = data.filter((entry) => !entry.isDeleted);
        if (data.length === 0) throw 'HG ranking not found';

        return exits.success(data);
      }

      // Regular user access - filter out password and isDeleted is false
      let data = await HGRankings.find().populateAll();
      const filteredData = data.filter(
        (entry) => entry.lgName !== 'password' && !entry.isDeleted
      );
      sails.log.info('Retrieving Harvest Games rankings..');

      return exits.success(filteredData);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
