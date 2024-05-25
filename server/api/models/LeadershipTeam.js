module.exports = {
  attributes: {
    seasonFrom: {
      type: 'string',
      columnType: 'date',
    },
    seasonTo: {
      type: 'string',
      columnType: 'date',
    },
    campus: {
      type: 'string',
    },
    lifestage: {
      type: 'string',
    },
    lifeGroup: {
      type: 'string',
    },
    leaderEmails: {
      type: 'json',
      columnType: 'array',
      defaultsTo: [],
    },
    lastUpdatedBy: {
      type: 'string',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
