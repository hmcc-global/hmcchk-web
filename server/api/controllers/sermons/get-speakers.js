module.exports = {
  
  friendlyName: 'Get speakers',

  description: 'Get speakers',

  inputs: {
    id: {
      required: false,
      type: 'number',
      description: 'Id of speaker'
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
    sails.log.info(`Get speakers..`);

    try {
      let data = await sails.helpers.sermons.getSpeakers();

      if (id) {
        sails.log.info(`Get speaker with id ${id}`);
        data = data.filter(d => d.id === id);

        if (data.length === 0) {
          sails.log(`No speaker with id ${id} found.`);
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
