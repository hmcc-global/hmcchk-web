module.exports = {
  friendlyName: 'Update Harvest Games Rankings',

  description: 'Update Harvest Games Rankings',

  inputs: {
    params: {
      required: true,
      type: 'json',
    },
  },

  exits: {
    success: {
      description: 'Rankings have been updated or created successfully',
    },
    invalid: {
      description: 'Failed to update rankings',
    },
    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ params }, exits) {
    const { id: lgRankingId, ...toUpdate } = params;

    try {
      if (lgRankingId) {
        // Update existing ranking
        const data = await HGRankings.updateOne({
          _id: lgRankingId,
        }).set(toUpdate);

        if (data) {
          return exits.success(data);
        }
        return exits.invalid();
      } else {
        const newRanking = await HGRankings.create(toUpdate).fetch();

        if (newRanking) {
          return exits.success(newRanking);
        }
        return exits.invalid();
      }
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
