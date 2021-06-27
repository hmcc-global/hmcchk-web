module.exports = {

  friendlyName: 'Get speakers',

  description: 'Get speakers',

  inputs: {
    id: {
      required: false,
      type: 'string',
      description: 'Id of speaker'
    }
  },

  exits: {},

  fn: async function({ id }, exits) {
    sails.log.info(`Get speakers..`);

    let url = sails.config.custom.speakers.host;

    if (id) {
      sails.log(`Getting speaker with id: ${id}`);
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
