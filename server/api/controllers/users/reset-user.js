module.exports = {
  // eslint-disable-next-line linebreak-style
  friendlyName: 'Reset users',

  description: 'Reset users',

  // i dont rlly know what the inputs are?
  // input yang gua butuh: user id to check usernya, trus LG
  // bisa buat everyone or a specific person
  // depends on the id no?
  // tapi technically cuman elgee doang ga sih?  gatau

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
        console.log(data);
        data.forEach(function (p) {
          if (p[field] != ``) {
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
