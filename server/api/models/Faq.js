module.exports = {
  attributes: {
    pageTopic: {
      type: 'string',
      required: true,
      enum: ['connect', 'ripple-out'],
    },
    question: {
      type: 'string',
      required: true,
    },
    answer: {
      type: 'string',
      required: true,
    },
    order: {
      type: 'number',
      defaultsTo: -1,
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
