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
    if (field) {
      try {
        let data = await User.update({
          _id: userId,
        })
          .set({
            [field]: ``,
          })
          .fetch();
        data.forEach(function (p) {
          if (p[field] != '') {
            return exits.invalid();
          }
        });
        return exits.success(data);
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    }
  },
};
