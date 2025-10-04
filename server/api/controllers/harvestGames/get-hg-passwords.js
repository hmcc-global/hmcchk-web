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
      if (filteredData.length === 0) {
        throw 'HG ranking not found';
      }

      const gameRanking = filteredData[0].gameRankings[gameId];
      if (String(password) !== String(gameRanking)) {
        return exits.unauthorized('Invalid password provided');
      }

      const ImageUrlData = data.filter(
        (entry) => entry.lgName === 'ImageUrl' && !entry.isDeleted
      );

      let imageLinkData = [];
      let googleLinkData = '';

      if (ImageUrlData.length > 0) {
        if (gameId < 3) {
          const linksString = ImageUrlData[0].gameRankings[gameId] || ''; // Accessing the specific gameId

          imageLinkData = linksString.split(',').map((link) => link.trim());
        } else if (gameId == 3) {
          googleLinkData =
            'https://docs.google.com/document/d/1uQE-XMzjOLiMION6vYc9s0mPEPM-VGFPAwZVN45kCEs/edit?usp=drive_link';
        } else if (gameId == 4) {
          googleLinkData =
            'https://docs.google.com/document/d/1_AR8DXJK4h-v7RTtMEHWMqtaPI-Id5TZsN0d48_Vdzk/edit?usp=drive_link';
        } else if (gameId == 5) {
          googleLinkData =
            'https://docs.google.com/presentation/d/1VJFRljKsBx3oEhOM6a5Jnx057cxNCa51xv2ZU6D9Y_w/edit?usp=drive_link';
        }
      }

      return exits.success({ imageLinkData, googleLinkData });
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
