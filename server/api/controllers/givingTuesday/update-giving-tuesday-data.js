module.exports = {
  friendlyName: 'Update Giving Tuesday data',

  description: 'Update Giving Tuesday data',

  inputs: {
    globalChurchAmount: {
      required: true,
      type: 'number',
    },
    globalChurchGivers: {
      required: true,
      type: 'number',
    },
    localChurchAmount: {
      required: true,
      type: 'number',
    },
    localChurchGivers: {
      required: true,
      type: 'number',
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
      globalChurchAmount,
      globalChurchGivers,
      localChurchAmount,
      localChurchGivers,
      year,
    },
    exits
  ) {
    sails.log.info(`Updating Giving Tuesday data for ${year}`);

    try {
      const data = await GivingTuesdayData.updateOne({ year }).set({
        globalChurch: {
          totaAmount: globalChurchAmount,
          totalGivers: globalChurchGivers,
        },
        localChurch: {
          totalAmount: localChurchAmount,
          totalGivers: localChurchGivers,
        },
      });

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
