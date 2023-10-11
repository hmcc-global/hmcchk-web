module.exports = {
  friendlyName: 'Get all available FAQ for public use',

  description:
    'Get all available FAQ if page topic is not specified. Otherwise, finds all faqs with that topic',

  inputs: {
    pageTopic: {
      required: true,
      type: 'string',
      description: 'Page topic of FAQ',
    },
  },

  exits: {},

  fn: async function ({ pageTopic }, exits) {
    try {
      // get faq by page topic for user-facing purposes
      if (pageTopic) {
        const data = await Faq.find({
          pageTopic: pageTopic,
          isDeleted: false,
        });
        return exits.success(data);
      }
      return exits.invalid('Page topic is required');
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
