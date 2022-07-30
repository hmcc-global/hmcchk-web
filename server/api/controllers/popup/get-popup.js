module.exports = {

  friendlyName: 'Get Pop Up',

  description: 'Get Pop Up',

  inputs: {
    name: {
      required: true,
      type: 'string'
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error'
    },
  },

  fn: async function({ name }, exits) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Getting popUp: ${name}`);

    try {
      const res = await PopUp.findOne({
        name
      });

      if (!res) {
        return exits.nonSuccess(err);
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  }
};

