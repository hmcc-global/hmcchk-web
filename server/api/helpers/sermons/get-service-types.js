module.exports = {

  friendlyName: 'Get service types',

  description: 'Get service types',

  inputs: {
  },

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.info(`Get service types..`);

    const key = 'serviceTypes';
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info('Returning service types from cache');
      return exits.success(result);
    }

    let url = sails.config.custom.serviceTypes.host;

    try {
      const data = await sails.helpers.getData(url);
      let transformedData = data.reduce((acc, {id, name}) => {
        acc.push({
          id: id,
          name: name
        });
        return acc;
      }, []);

      if (transformedData.length > 0) {
        sails.cache.set(key, transformedData);
        sails.log.info('Cached service types');
      }

      return exits.success(transformedData);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }

};

