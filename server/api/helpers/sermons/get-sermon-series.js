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

    let url = sails.config.custom.sermonSeries.host;

    if (id) {
      sails.log(`Getting sermon series with id: ${id}`);
      url += `/${id}`;
    }

    try {
      const data = await sails.helpers.getData(url, parameters = { 'per_page': 100 });
      let transformedSpeaker = data.reduce((acc, {id, name}) => {
        acc[id] = name;
        return acc;
      }, {});

      return exits.success(transformedSpeaker);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }

};

