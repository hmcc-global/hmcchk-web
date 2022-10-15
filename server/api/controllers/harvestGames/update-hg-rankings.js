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
      description: 'Rankings have been updated successfully',
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

    if (lgRankingId) {
      try {
        const data = await HGRankings.updateOne({
          _id: lgRankingId,
        }).set(toUpdate);

        if (data) {
          return exits.success(data);
        }
        return exits.invalid();
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    }

    sails.log.error(err);
    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
