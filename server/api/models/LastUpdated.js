module.exports = {
  attributes: {
    modelName: {
      type: 'string',
      required: true,
      unique: true
    },
    lastUpdatedBy: {
      type: 'string',
    }
  },
};

