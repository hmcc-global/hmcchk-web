module.exports = {
  friendlyName: 'Get Harvest Games password',

  description: 'Get Harvest Games password',

  inputs: {
    gameId: {
      required: false,
      type: 'number',
    },
    password: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Images returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve Harvest Games password',
    },
    unauthorized: {
      description: 'Invalid password provided',
    },
  },

  fn: async function ({ gameId, password }, exits) {
    try {
      let data = await HGRankings.find().populateAll();
      const filteredData = data.filter((entry) => entry.lgName === 'password');
      if (data.length === 0) throw 'HG ranking not found';

      // Verify the password
      if (String(password) !== String(filteredData[0].gameRankings[gameId])) {
        return exits.unauthorized('Invalid password provided');
      }

      let imageLinkData = [];

      if (gameId == 0) {
        imageLinkData = [
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game1_pg1.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game1_pg2.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game1_pg3.gif',
        ];
      } else if (gameId == 1) {
        imageLink = [
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game2_pg1.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game2_pg2.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game2_pg3.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game2_pg4.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game2_pg5.gif',
        ];
      } else if (gameId == 2) {
        imageLink = [
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game3_pg1.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game3_pg2.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game3_pg3.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game3_pg4.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game3_pg5.gif',
          'https://hongkong.sub.hmcc.net/wp-content/uploads/hg_game3_pg6.gif',
        ];
      }

      return exits.success({ imageLinkData });
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
