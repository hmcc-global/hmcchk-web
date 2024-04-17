module.exports = {
  friendlyName: 'Get latest Campus list',

  description:
    'Get latest Campus list',

  inputs: {
    includeDeleted: {
      required: false,
      type: 'boolean',
      default: false
    }
  },

  exits: {},

  fn: async function ({ includeDeleted }, exits) {
    try {
      const data = await sails.helpers.leadershipteam.getLatestLeadershipTeams(includeDeleted);
      if (data === null) return exits.error('Unexpected');

      // eslint-disable-next-line eqeqeq
      const lifestages = data.map(x => x.lifestage).filter(l => l != null && l !== '');
      return exits.success([...new Set(lifestages)]);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
