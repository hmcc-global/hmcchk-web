module.exports = {
  friendlyName: 'Create Fundraise Campaign object',

  description: 'Create Fundraise Campaign object',

  inputs: {
    campaignName: {
      type: 'string',
      required: true,
    },
    categoryName: {
      type: 'string',
      required: true,
    },
    categoryKey: {
      type: 'string',
      required: true,
    },
    amount: {
      type: 'number',
    },
    givers: {
      type: 'number',
    },
    milestones: {
      type: 'json',
    },

    exits: {},

    fn: async function (
      { campaignName, categoryName, categoryKey, amount, givers, milestones },
      exits
    ) {
      try {
        if (!campaignName || !categoryName || !categoryKey) {
          return exits.error('Missing required fields');
        }

        const newFundraise = await Fundraise.create({
          campaignName,
          categoryName,
          categoryKey,
          amount,
          givers,
          milestones,
        });

        if (!newFundraise) {
          return exits.error('Fundraise campaign not created');
        }

        return exits.success(newFundraise);
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    },
  },
};
