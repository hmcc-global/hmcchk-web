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

    try {
      return exits.success(await sails.helpers.sermons.getSpeaker(id));
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }
};
