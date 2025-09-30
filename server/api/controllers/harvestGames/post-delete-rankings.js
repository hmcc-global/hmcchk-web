module.exports = {
  friendlyName: 'Delete Harvest Games Ranking',

  description: 'Delete Harvest Games Ranking',

  inputs: {
    lgRankingId: {
      required: true,
      type: 'string',
    },
  },
  exits: {
    success: {
      description: 'Ranking have been deleted successfully',
      responseType: 'ok',
    },
    invalid: {
      description: 'Failed to delete rankings',
    },
  },
  fn: async function ({ lgRankingId }, exits) {
    try {
      // Check first if the entry exists and isDeleted is false
      const existingEntry = await HGRankings.findOne({
        _id: lgRankingId,
        isDeleted: false,
      });

      if (!existingEntry) {
        throw 'HG ranking not found';
      }

      const data = await HGRankings.updateOne({ _id: lgRankingId }).set({
        isDeleted: true,
      });
      if (data) {
        return exits.success();
      }
    } catch (err) {
      sails.log.error(err);
      return exits.invalid(err);
    }
  },
};
