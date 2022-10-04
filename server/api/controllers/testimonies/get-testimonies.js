module.exports = {
  friendlyName: 'Get testimonies',

  description: 'Get all testimonies',

  inputs: {
    tags: {
      description: 'testimonies with the tags to be returned',
      type: 'json',
      required: true,
    },
    isApproved: {
      description: 'testimonies approval status to be returned',
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

  fn: async function ({ tags, isApproved }, exits) {
    try {
      let data;

      if (isApproved) {
        data = await Testimonies.find({ isApproved, isDeleted: false });
      } else {
        data = await Testimonies.find({ isDeleted: false });
      }

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
