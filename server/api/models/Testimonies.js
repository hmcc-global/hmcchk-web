module.exports = {
  attributes: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      defaultsTo: '',
    },
    testimony: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'json',
      columnType: 'array',
      defaultsTo: [],
    },
    image: {
      type: 'string',
      required: true,
      defaultsTo: '',
    },
    isApproved: {
      type: 'boolean',
      defaultsTo: false,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
