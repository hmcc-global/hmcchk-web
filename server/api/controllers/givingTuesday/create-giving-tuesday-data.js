module.exports = {
  friendlyName: 'Create Giving Tuesday data',

  description: 'Create Giving Tuesday data',

  inputs: {
    categories: {
      required: true,
      type: 'json',
      columnType: "array",
    },
    year: {
      required: true,
      type: 'number',
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error',
    },
  },

  fn: async function (
    {
      categories,
      year,
    },
    exits
  ) {
    sails.log.info(`Creating Giving Tuesday data for ${year}`);

    try {
      const existing = await GivingTuesdayData.findOne({ year });
      if (existing) {
        return exits.nonSuccess(`Giving Tuesday data for year ${year} already exists`);
      }

      await GivingTuesdayData.create({
        year,
        categories,
      });

      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
