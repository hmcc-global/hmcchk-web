const Fundraise = require('../../models/Fundraise');

module.exports = {
  friendlyName: 'Update Fundraise Campaign object',

  description: 'Update Fundraise Campaign object',

  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    campaignName: {
      type: 'string',
    },
    categoryName: {
      type: 'string',
    },
    categoryKey: {
      type: 'string',
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
    isDeleted: {
      type: 'boolean',
    },
  },

  exits: {
    duplicateError: {
      description: 'Duplicate data found',
    },
  },
  fn: async function (
    {
      id,
      campaignName,
      categoryName,
      categoryKey,
      amount,
      givers,
      milestones,
      isDeleted,
    },
    exits
  ) {
    const user = this.req.user.fullName;

    try {
      if (!id) {
        return exits.error('Missing required field: id');
      }

      let lastUpdatedBy = user;

      const existingFundraise = Fundraise.updateOne({ id }).set({
        campaignName,
        categoryName,
        categoryKey,
        amount,
        givers,
        milestones,
        lastUpdatedBy,
        isDeleted,
      });

      if (!existingFundraise) {
        return exits.error('Fundraise campaign not found');
      }

      return exits.success(existingFundraise);
    } catch (err) {
      sails.log.error(err);

      if (err.code === 'E_UNIQUE') {
        return exits.duplicateError(err);
      }
      return exits.error(err);
    }
  },
};
