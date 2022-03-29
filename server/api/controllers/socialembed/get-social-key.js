module.exports = {
  friendlyName: 'Get keys for social embed ',

  description: 'get key',

  inputs: {},

  exits: {
    nonSuccess: {
      description: 'Error retrieving social embed key.',
    },
    success: {
      description: 'Successfully retrieved social embed key.',
    },
  },

  fn: async function ({ inputs }, exits) {
    try {
      let data = await SocialEmbedKeys.find().sort('createdAt DESC').limit(1);
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
