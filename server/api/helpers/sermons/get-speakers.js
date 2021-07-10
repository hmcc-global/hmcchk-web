module.exports = {

  friendlyName: 'Get speakers',

  description: 'Get speakers',

  inputs: {
  },

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.info(`Get speakers..`);

    const key = 'speakers';
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info('Returning speakers from cache');
      return exits.success(result);
    }

    let url = sails.config.custom.speakers.host;

    try {
      const data = await sails.helpers.getData(url);
      let transformedSpeaker = data.reduce((acc, {id, name}) => {
        acc.push({
          id: id,
          name: name
        });
        return acc;
      }, []);

      if (transformedSpeaker.length > 0) {
        sails.cache.set(key, transformedSpeaker);
        sails.log.info('Cached speakers');
      }

      return exits.success(transformedSpeaker);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }

};
