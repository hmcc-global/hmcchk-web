module.exports = {
  friendlyName: "Get all available tags",

  description: "Get all available tags",

  inputs: {},

  exits: {
    nonSuccess: {
      description: "Error",
    },
  },

  // Returns a map: tag id => tag name
  fn: async function (inputs, exits) {
    sails.log.info(`Get tags..`);

    const key = "tags";
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info("Returning tags from cache");
      return exits.success(result);
    }

    sails.log.info(`Getting all tags..`);

    const url = sails.config.custom.tags.host;

    try {
      const data = await sails.helpers.getData(url);
      const tagsMap = new Map();
      data.forEach((wv) => {
        tagsMap[wv.id] = wv.name;
      });

      if (tagsMap.length > 0) {
        sails.cache.set(key, tagsMap);
        sails.log.info("Cached tags");
      }

      return exits.success(tagsMap);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};