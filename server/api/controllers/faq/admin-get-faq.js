module.exports = {
  friendlyName: 'Get all available FAQ for admin use',

  description:
    'Get all available FAQ if id is not specified. Otherwise, finds a specific one',

  inputs: {
    id: {
      required: false,
      type: 'string',
      description: 'id of FAQ',
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      // get faq by id for admin-facing purposes
      if (id) {
        const data = await Faq.findOne({ _id: id });
        return exits.success(data);
      }

      // get all faqs
      const data = await Faq.find();
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
