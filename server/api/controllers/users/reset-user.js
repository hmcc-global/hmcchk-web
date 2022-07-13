module.exports = {
  // eslint-disable-next-line linebreak-style
  friendlyName: 'Reset users',

  description: 'Reset users',

  inputs: {
    userId: {
      required: false,
      type: 'string',
    },
    field: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'LG reset',
    },
    invalid: {
      description: 'Failed to reset LG',
    },
  },

  fn: async function ({ userId, field }, exits) {
    const modelName = 'user';

    if (field) {
      try {
        let data = await User.update({
          _id: userId,
        })
          .set({
            [field]: ``,
          })
          .fetch();
        data.forEach((p) => {
          if (p[field] !== '') {
            return exits.invalid();
          }
        });

        let existing;

        existing = await LastUpdated.updateOne({ modelName: modelName }).set({
          lastUpdatedBy: this.req.user.fullName
        });

        if (!existing) {
          existing = await LastUpdated.create({
            modelName: modelName,
            lastUpdatedBy: this.req.user.fullName
          });
          if (!existing) {
            return exits.invalid();
          }
        }
        return exits.success(data);
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    }
  },
};
