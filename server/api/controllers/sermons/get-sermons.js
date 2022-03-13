module.exports = {

  friendlyName: 'Get sermons',

  description: 'Get sermons',

  inputs: {
    id: {
      required: false,
      type: 'number',
      description: 'Id of sermon'
    },
    includeProtected: {
      required: false,
      type: 'boolean',
      default: false
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

  fn: async function({ id, includeProtected }, exits) {
    sails.log.info(`Get sermons`);

    try {
      let data = await sails.helpers.sermons.getSermons();
      if (!includeProtected) {
        data = data.filter(s => s.protected === false);
      }
      if (id) {
        sails.log.info(`Get sermon with id ${id}`);
        data = data.filter(d => d.id === id);
        if (data.length === 0) {
          sails.log(`No sermon with id ${id} found.`);
          return exits.noData(data);
        }
        return exits.success(data);
      }

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  }
};
