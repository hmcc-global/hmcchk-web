module.exports = {
  friendlyName: 'Get Published Pop Up',

  description: 'Get Published Pop Up',

  inputs: {},

  exits: {
    nonSuccess: {
      description: 'Error',
    },
  },

  fn: async function ({}, exits) {
    try {
      let res;

      res = await PopUp.findOne({
        isPublished: true,
      });

      if (!res) {
        return exits.nonSuccess();
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
