module.exports = {
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

  // apa sih
  fn: async function ({ userId, field }, exits) {
    console.log('woi tolong jalan');
    console.log('masuk ga');
    console.log('woi lu tuh punya masalah apa sih');

    if (field) {
      // console.log('user id', userId);
      try {
        let data = await User.update({
          // lifestage: campus,
          _id: userId,
        })
          .set({
            [field]: ``,
          })
          .fetch();
        console.log(data);
        // let data = await User.update(
        //   {},
        //   { $set: { [field]: '' } },
        //   { multi: true }
        // );
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
