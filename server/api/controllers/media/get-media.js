module.exports = {
  friendlyName: "Get media",

  description: "Get media",

  inputs: {
    id: {
      required: false,
      type: "number",
      description: "Id of media",
    },
  },

  exits: {
    noData: {
      description: "No data found",
    },
    noSuccess: {
      description: "Error",
    },
  },

  fn: async function ({ id }, exits) {
    sails.log.info(`Get media`);

    try {
      let data = await sails.helpers.media.getMedia();
      if (id) {
        sails.log.info(`Get media with id ${id}`);
        data = data.filter((d) => d.id === id);
        if (data.length === 0) {
          sails.log(`No media with id ${id} found.`);
          return exits.noData(data);
        }
        return exits.success(data);
      }

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  },
};
