module.exports = {
  friendlyName: 'Get published prayers',

  description: 'Get all published prayers',

  inputs: {
    topics: {
      description: 'published prayers with the topics to be returned',
      type: 'number',
      required: false,
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error retrieving prayers.',
    },
    success: {
      description: 'Successfully retrieved prayers.',
    },
  },

  fn: async function ({ topics }, exits) {
    try {
      let data = await Easter.find({
        isPublished: true,
        isDeleted: false,
      });

      sails.log.info(`Getting testimony with tags: ${topics}`);
      if (data === null) {
        return exits.error('no data retrieved');
      }
      if (topics) {
        data = data.filter((d) => d.topics === topics);
      }

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
