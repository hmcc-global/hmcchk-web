module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    originalUrl: {
      type: 'string',
      required: true,
    },
    urlCode: {
      type: 'string',
      unique: 'true',
    },
    shortUrl: {
      type: 'string',
      unique: 'true',
    },
    createdBy: {
      type: 'string',
    },
    lastUpdatedBy: {
      type: 'string',
    },
  },
};
