module.exports = {
  friendlyName: "Get Giving Tuesday data",

  description: "Get Giving Tuesday data",

  inputs: {
    year: {
      required: true,
      type: 'string',
    }
  },

  exits: {
    noData: {
      description: "No data found",
    },
    nonSuccess: {
      description: "Error",
    },
  },

  fn: async function ({ year }, exits) {
    sails.log.info(`Get Giving Tuesday data`);

    try {
      let data = await GivingTuesdayData.findOne({ year });
      sails.log.info(data);

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};