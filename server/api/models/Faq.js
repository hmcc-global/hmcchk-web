module.exports = {
  attributes: {
    pageTopic: {
      type: 'string',
      required: true,
    },
    question: {
      type: 'string',
      required: true,
    },
    answer: {
      type: 'string',
      required: true,
    },
    createdBy: {
      type: 'string',
      required: true,
    },
    lastUpdatedBy: {
      type: 'string',
      required: true,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
