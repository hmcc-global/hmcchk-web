module.exports = {
  friendlyName: 'Get last updated time for a Mongo Model',

  description: 'Get Last Updated time for a Mongo Model',

  inputs: {
    modelName: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    invalid: {
      description: 'Error getting last updated info',
    },
  },
  fn: async function ({ modelName }, exits) {
    try {
      if (modelName && modelName !== '') {
        const data = await LastUpdated.findOne({ modelName: modelName });
        return exits.success(data.updatedAt);
      }
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};

