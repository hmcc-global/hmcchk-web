module.exports = {
  friendlyName: 'Update leadership team',

  description: 'Update a leadership team entry',

  inputs: {
    id: {
      required: true,
      type: 'string',
    },
    seasonFrom: { type: 'string' },
    seasonTo: { type: 'string' },
    campus: { type: 'string' },
    lifestage: { type: 'string' },
    lifeGroup: { type: 'string' },
    leaders: { type: 'json' },
    isDeleted: { type: 'boolean' },
  },

  exits: {
    success: {
      description: 'Leadership team updated.',
    },
    error: {
      description: 'Failed to update leadership team.',
    },
    invalidId: {
      statusCode: 409,
      description: 'The id is invalid',
    },
    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function (
    {
      id,
      seasonFrom,
      seasonTo,
      campus,
      lifestage,
      lifeGroup,
      leaders,
      isDeleted,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating leadership team entry`);

    if (id) {
      try {
        const existing = await LeadershipTeam.updateOne({ id }).set({
          seasonFrom,
          seasonTo,
          campus,
          lifestage,
          lifeGroup,
<<<<<<< HEAD
          leaders,
=======
          leaders: leadersArray,
>>>>>>> 60db39a (GH-939: Add leadership team model and api)
          lastUpdatedBy: user,
          isDeleted,
        });

        if (!existing) {
          sails.log.error('invalidId');
          return exits.error();
        }

        return exits.success(existing);
      } catch (err) {
        sails.log(err);
        return exits.error(err);
      }
    }

    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
