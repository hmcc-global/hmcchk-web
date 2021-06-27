module.exports = {
  
  friendlyName: 'Get sermon series',

  description: 'Get sermon series',

  inputs: {
    id: {
      required: false,
      type: 'string',
      description: 'Id of sermon series'
    }
  },

  exits: {},

  fn: async function({ id }, exits) {
    sails.log.info(`Get sermon series..`);

    try {
      return exits.success(await sails.helpers.sermons.getSermonSeries(id));
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }
};

