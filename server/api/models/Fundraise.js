module.exports = {
  attributes: {
    campaignName: {
      type: 'string',
      required: true,
    },
    categoryName: {
      type: 'string',
      required: true,
    },
    categoryKey: {
      type: 'string',
      required: true,
    },
    amount: {
      type: 'number',
    },
    givers: {
      type: 'number',
    },
    milestones: {
      type: 'json',
      columnType: 'array',
      defaultsTo: [],
    },
    createdBy: {
      type: 'string',
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
