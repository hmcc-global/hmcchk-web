module.exports = {
  friendlyName: 'Delete HG ranking by ID',

  description: 'Delete HG ranking by ID',

  inputs: {
    rankingId: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'HG ranking record deleted successfully',
    },
    invalid: {
      description: 'Failed to delete HG ranking record',
    },

    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ rankingId }, exits) {
    if (rankingId) {
      try {
        const data = await HGRankings.updateOne({
          _id: rankingId,
          isDeleted: false,
        }).set({ isDeleted: true });

        if (!data) {
          return exits.invalid();
        }

        return exits.success(data);
      } catch (err) {
        sails.log(err);
        return exits.error(err);
      }
    }
    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
