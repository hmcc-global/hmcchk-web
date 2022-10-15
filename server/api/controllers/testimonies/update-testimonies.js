module.exports = {
  friendlyName: 'Update Testimonies',

  description: 'Update Testimonies',

  inputs: {
    id: {
      required: true,
      type: 'string',
    },
    theme: {
      required: false,
      type: 'string',
    },
    testimony: {
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
    { id, theme, testimony, name, lifestage, email, isPublished, isDeleted },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating testimony: ${theme}`);

    try {
      if (isDeleted && isPublished) {
        isPublished = false;
      }

      const existing = await Testimonies.updateOne({ id }).set({
        theme,
        testimony,
        name,
        lifestage,
        email,
        isPublished,
        isDeleted,
      });

      if (!existing) {
        throw `Testimony doesn't exist yet`;
      }

      return exits.success(existing);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
