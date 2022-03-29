module.exports = {
  friendlyName: 'add social embed key',

  description: 'add social embed key ',

  inputs: {
    keyValue: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'social embed key created successfully',
    },
  },

  fn: async function ({ keyValue }, exits) {
    try {
      const newSocialKey = await SocialEmbedKeys.create({
        keyValue,
      });

      return exits.success(newSocialKey);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
