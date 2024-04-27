module.exports = {
  friendlyName: 'Get latest LG list',

  description:
    'Get latest LG list',

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

      const lifeGroups = data.map(x => x.lifeGroup);
      lifeGroups.push('Not in a LIFE Group');
      return exits.success([... new Set(lifeGroups)]);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
