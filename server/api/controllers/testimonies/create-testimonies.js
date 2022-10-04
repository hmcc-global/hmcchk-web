module.exports = {
  friendlyName: 'Create testimony',

  description: 'submit a testimony',

  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
    },
    testimony: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'json',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'testimony created successfully',
    },
  },

  fn: async function ({ fullName, email, testimony, tags }, exits) {
    try {
      const newTestimony = await Testimonies.create({
        fullName,
        email,
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
