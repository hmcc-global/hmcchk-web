module.exports = {
  friendlyName: 'Get Harvest Games password and return image links',

  description: 'Get Harvest Games password and return image links',

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

  // To allow user to view password-protected images
  fn: async function ({ gameId, password }, exits) {
    try {
      let data = await HGRankings.find().populateAll();
      const filteredData = data.filter(
        (entry) => entry.lgName === 'password' && !entry.isDeleted
      );
      if (data.length === 0) throw 'HG ranking not found';

      // Verify the password
      if (String(password) !== String(filteredData[0].gameRankings[gameId])) {
        return exits.unauthorized('Invalid password provided');
      }

      let imageLinkData = [];

      if (gameId == 0) {
        imageLinkData = [];
      } else if (gameId == 1) {
        imageLinkData = [];
      } else if (gameId == 2) {
        imageLinkData = [];
      }

      return exits.success({ imageLinkData });
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
