module.exports = {
  friendlyName: 'Update Prayers',

  description: 'Update Prayers',

  inputs: {
    id: {
      required: true,
      type: 'string',
    },
    prayer: {
      required: false,
      type: 'string',
    },
    name: {
      required: false,
      type: 'string',
    },
    lifestage: {
      required: false,
      type: 'string',
    },
    email: {
      required: false,
      type: 'string',
    },
    topics: {
      required: false,
      type: 'number',
    },
    isPublished: {
      type: 'boolean',
    },
    isDeleted: {
      type: 'boolean',
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error',
    },
  },

  fn: async function (
    {
      id,
      prayer,
      name,
      lifestage,
      email,
      topics,
      isPublished,
      isDeleted,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating prayer: ${prayer}`);

    try {
      if (isDeleted && isPublished) {
        isPublished = false;
      }

      const existing = await Prayers.updateOne({ id }).set({
        prayer,
        name,
        lifestage,
        email,
        topics,
        isPublished,
        isDeleted,
      });

      if (!existing) {
        throw `Prayer doesn't exist yet`;
      }

      return exits.success(existing);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
