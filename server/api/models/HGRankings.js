module.exports = {
  attributes: {
    lgName: {
      type: 'String',
    },
    gameRankings: {
      type: 'json',
    },
    overallRanking: {
      type: 'number',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
