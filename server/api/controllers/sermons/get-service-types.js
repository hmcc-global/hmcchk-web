module.exports = {
  
  friendlyName: 'Get service types',

  description: 'Get service types',

  inputs: {
    id: {
      required: false,
      type: 'number',
      description: 'Id of service types'
    }
  },

  exits: {
    noData: {
      description: 'No data found'
    }
  },

  fn: async function({ id }, exits) {
    sails.log.info(`Get service types..`);

    try {
      let data = await sails.helpers.sermons.getServiceTypes();

      if (id) {
        sails.log.info(`Get service types with id ${id}`);
        data = data.filter(d => {
          return d.id === id;
        });

        if (data.length === 0) {
          sails.log(`No service types with id ${id} found.`);
          return exits.noData(data);
        }
      }
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }
};

