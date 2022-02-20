module.exports = {
  friendlyName: 'Get praises',

  description: 'Get all praises',

  inputs: {},

  exits: {
    nonSuccess: {
      description: 'Error',
    },
    success: {
      description: 'Successfully retrieved praises.',
    },
  },

  fn: async function ({ category }, exits) {
    try {
      const data = await Praises.find({
        category: category,
      });

      if (data === null) return exits.error('no data retrieved');

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
