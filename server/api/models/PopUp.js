module.exports = {
  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    title: {
      type: 'string',
    },
    imageLink: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    buttonTexts: {
      type: 'json',
    },
    buttonLinks: {
      type: 'json',
    },
    isPublished: {
      type: 'boolean',
      defaultsTo: false
    }
  },
};

