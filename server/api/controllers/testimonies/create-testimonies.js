module.exports = {
  friendlyName: 'Create testimony',

  description: 'submit a testimony',

  inputs: {
    fullName: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: false,
    },
    theme: {
      type: 'string',
      required: false,
    },
    testimony: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'json',
      required: false,
    },
  },

  exits: {
    success: {
      description: 'testimony created successfully',
    },
  },

  fn: async function ({ fullName, email, theme, testimony, tags }, exits) {
    try {
      const newTestimony = await Testimonies.create({
        fullName,
        email,
        theme,
        testimony,
        tags,
      });

      return exits.success(newTestimony);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
