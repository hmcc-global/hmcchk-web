module.exports = {
  friendlyName: 'Get praises',

  description: 'Get all praises',

  inputs: {
    category: {
      description: 'category of praises to be returned',
      type: 'string',
      required: true,
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error retrieving praises.',
    },
    success: {
      description: 'Successfully retrieved praises.',
    },
  },

  fn: async function ({ category }, exits) {
    try {
      let data = await Praises.find();
      if (category) {
        sails.log.info(`Getting praise card with category: ${category}`);
        data = data.filter((d) => d.category === category);
      }

      if (data === null) return exits.error('no data retrieved');

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
