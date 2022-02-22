module.exports = {
  friendlyName: 'Create praise',

  description: 'submit a praise ',

  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    message: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'praise created successfully',
    },
  },

  fn: async function ({ fullName, message, category }, exits) {
    try {
      const newPraise = await Praises.create({
        fullName,
        message,
        category,
      });

      return exits.success(newPraise);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
