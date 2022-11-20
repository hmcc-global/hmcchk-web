module.exports = {
  friendlyName: "Get Giving Tuesday data",

  description: "Get Giving Tuesday data",

  inputs: {
    year: {
      required: true,
      type: 'number',
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
    sails.log.info(`Retrieving Giving Tuesday data for ${year}`);

    try {
      let data = await GivingTuesdayData.findOne({ year });

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};