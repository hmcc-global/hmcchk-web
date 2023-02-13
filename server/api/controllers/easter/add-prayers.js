module.exports = {
  friendlyName: 'Add a prayer',

  description: 'submit a prayer',

  inputs: {
    fullName: {
      type: 'string',
      required: false,
    },
    email: {
      type: 'string',
      required: false,
    },
    prayer: {
      type: 'string',
      required: true,
    },
    topics: {
      type: 'number',
      required: false,
    },
  },

  exits: {
    success: {
      description: 'testimony created successfully',
    },
  },

  fn: async function ({ fullName, email, prayer, topics }, exits) {
    try {
      const newPrayer = await Easter.create({
        fullName,
        email,
        prayer,
        topics,
      });

      return exits.success(newPrayer);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
