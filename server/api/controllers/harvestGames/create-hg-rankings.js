module.exports = {
  friendlyName: 'Create Harvest Games Ranking',

  description: 'Create Harvest Games Ranking',

  inputs: {
    lgName: {
      required: true,
      type: 'string',
    },
    gameRankings: {
      required: false,
      type: 'json',
      defaultsTo: [0, 0, 0],
    },
    overallRanking: {
      required: false,
      type: 'number',
      defaultsTo: 0,
    },
  },

  exits: {
    nonSuccess: {
      description: 'Failed to create Harvest Games Ranking',
    },
  },

  fn: async function ({ lgName, gameRankings, overallRanking }, exits) {
    // const user = this.req.user.fullName;
    // sails.log.info(`${user}: Creating Harvest Games Ranking: ${lgName}`);

    try {
      let res;

      res = await HGRankings.create({
        lgName,
        gameRankings,
        overallRanking,
      }).fetch();

      if (!res) {
        return exits.nonSuccess(err);
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
