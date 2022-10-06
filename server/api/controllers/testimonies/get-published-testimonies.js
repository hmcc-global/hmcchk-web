module.exports = {
  friendlyName: 'Get published testimonies',

  description: 'Get all published testimonies',

  inputs: {
    tags: {
      description: 'published testimonies with the tags to be returned',
      type: 'json',
      required: false,
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error retrieving testimonies.',
    },
    success: {
      description: 'Successfully retrieved testimonies.',
    },
  },

  fn: async function ({ tags }, exits) {
    try {
      let data = await Testimonies.find({
        isPublished: true,
        isDeleted: false,
      });

      sails.log.info(`Getting testimony with tags: ${tags}`);
      if (data === null) return exits.error('no data retrieved');

      data = data.filter((d) => d.tags === tags);

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
