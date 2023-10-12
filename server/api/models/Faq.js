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
    isPublished: {
      type: 'boolean',
      defaultsTo: false,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
