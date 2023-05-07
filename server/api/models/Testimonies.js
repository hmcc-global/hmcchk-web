module.exports = {
  attributes: {
    name: {
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
    lifestage: {
      type: 'string',
      required: false,
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
