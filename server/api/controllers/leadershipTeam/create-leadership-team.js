module.exports = {
  friendlyName: 'Create leadership team',

  description: 'Create a leadership team entry',

  inputs: {
    seasonFrom: { type: 'string' },
    seasonTo: { type: 'string' },
    campus: { type: 'string' },
    lifestage: { type: 'string' },
    lifeGroup: { type: 'string' },
    leaders: { type: 'string' },
  },

  exits: {
    success: {
      description: 'Leadership team entry created successfully',
    },
    error: {
      description: 'Failed to create leadership team.',
    },
  },

  fn: async function (
    { seasonFrom, seasonTo, campus, lifestage, lifeGroup, leaders },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Creating leadership team entry`);

    try {
      const leadersArray = leaders ? leaders.split(',') : [];

      const res = await LeadershipTeam.create({
        seasonFrom,
        seasonTo,
        campus,
        lifestage,
        lifeGroup,
        leaders: leadersArray,
        lastUpdatedBy: user,
      });

      if (!res) {
        return exits.error(err);
      }

      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
