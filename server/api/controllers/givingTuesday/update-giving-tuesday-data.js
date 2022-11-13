module.exports = {
  friendlyName: 'Update Giving Tuesday data',

  description: 'Update Giving Tuesday data',

  inputs: {
    categories: {
      required: true,
      type: 'json',
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
    sails.log.info(`Updating Giving Tuesday data for ${year}`);

    try {
      const data = await GivingTuesdayData.updateOne({ year }).set({
        categories,
      });

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
