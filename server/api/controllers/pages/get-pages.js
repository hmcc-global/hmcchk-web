module.exports = {
  friendlyName: "Get all available pages",

  description: "Get all available pages",

  inputs: {
    id: {
      required: false,
      type: "number",
      description: "Id of page",
    },
  },

  exits: {
    noData: {
      description: "No data found",
    },
    nonSuccess: {
      description: "Error",
    },
  },

  fn: async function ({ id }, exits) {
    sails.log.info(`Get pages`);

    try {
      let data = await sails.helpers.pages.getPages();
      if (id) {
        sails.log.info(`Get page with id ${id}`);
        data = data.filter((d) => d.id === id);
        if (data.length === 0) {
          sails.log(`No page with id ${id} found.`);
          return exits.noData(data);
        }
        return exits.success(data);
      }

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
