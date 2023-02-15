module.exports = {
  attributes: {
    fullName: {
      type: 'string',
      defaultsTo: '',
    },
    email: {
      type: 'string',
      defaultsTo: '',
    },
    prayer: {
      type: 'string',
      required: true,
    },
    topics: {
      type: 'number',
      required: false,
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
