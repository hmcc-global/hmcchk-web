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
    theme: {
      type: 'string',
      defaultsTo: '',
    },
    testimony: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'json',
    },
    image: {
      type: 'string',
      defaultsTo: '',
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
