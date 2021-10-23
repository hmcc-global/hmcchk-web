module.exports = {
  friendlyName: "Refresh cache on demand",

  description: "Refresh cache on demand",

  inputs: {
    // TODO have some sort of authentication so only allowableUsers can refresh cache
  },

  exits: {
    nonSuccess: {
      description: "Error",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.info(`Refreshing cache..`);

    try {
      sails.cache.flushAll();
      await sails.helpers.cache.cacheLatest();
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
