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
    topic: {
      type: 'number',
      required: false,
    },
    lifestage: {
      type: 'string',
      required: false,
    }
  },

  exits: {
    success: {
      description: 'testimony created successfully',
    },
  },

  fn: async function ({ fullName, email, prayer, topic, lifestage }, exits) {
    try {
      const newPrayer = await Easter.create({
        fullName,
        email,
        prayer,
        topic,
        lifestage,
      });

      return exits.success(newPrayer);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
