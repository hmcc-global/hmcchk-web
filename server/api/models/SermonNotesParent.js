module.exports = {
  attributes: {
    sermonId: {
      type: 'string',
      unique: true,
    },
    title: {
      required: true,
      type: 'string',
    },
    subtitle: {
      required: false,
      type: 'string',
    },
    speaker: {
      required: true,
      type: 'string',
    },
    sermonSeries: {
      required: false,
      type: 'string',
    },
    date: {
      type: 'ref',
      columnType: 'datetime',
      required: true,
    },
    imageLink: {
      required: false,
      type: 'string',
    },
    originalContent: {
      required: true,
      type: 'json',
    },
    sermonLink: {
      required: true,
      type: 'string',
    },
    serviceType: {
      required: true,
      type: 'string',
    },
    passage: {
      required: true,
      type: 'string',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
    isPublished: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
