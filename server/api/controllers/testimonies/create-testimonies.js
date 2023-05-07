module.exports = {
  friendlyName: 'Create testimony',

  description: 'submit a testimony',

  inputs: {
    name: {
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
    lifestage: {
      type: 'string',
      required: false,
    },
  },

  exits: {
    success: {
      description: 'testimony created successfully',
    },
  },

  fn: async function (
    { name, email, theme, testimony, tags, lifestage },
    exits
  ) {
    try {
      const newTestimony = await Testimonies.create({
        name,
        email,
        theme,
        testimony,
        tags,
        lifestage,
      });

      return exits.success(newTestimony);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
