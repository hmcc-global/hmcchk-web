module.exports = {
  
  friendlyName: 'Get sermon series',

  description: 'Get sermon series',

  inputs: {
    id: {
      required: false,
      type: 'number',
      description: 'Id of sermon series'
    }
  },

  exits: {
    noData: {
      description: 'No data found'
    },
    nonSuccess: {
      description: 'Error'
    },
  },

  fn: async function({ id }, exits) {
    sails.log.info(`Get sermon series..`);

    try {
      let data = await sails.helpers.sermons.getSermonSeries();

      if (id) {
        sails.log.info(`Get sermon series with id ${id}`);
        data = data.filter(d => d.id === id);

        if (data.length === 0) {
          sails.log(`No sermon series with id ${id} found.`);
          return exits.noData(data);
        }
      }
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  }
};

