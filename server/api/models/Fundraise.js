module.exports = {
  attributes: {
    // 1 campaign can have many categories. but this would be the keyword for the campaign
    campaignName: {
      type: 'string',
      required: true,
    },
    // name for giving category e.g. "Food for the poor"
    categoryName: {
      type: 'string',
      required: true,
    },
    // this would be the key for the category e.g. "food-for-the-poor"
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
      example: [
        {
          milestoneName: 'Baskets of food',
          milestoneAmount: 1000,
        },
        {
          milestoneName: 'Bags of rice',
          milestoneAmount: 40000,
        },
      ],
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
