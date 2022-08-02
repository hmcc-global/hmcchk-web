module.exports = {

  friendlyName: 'Get Pop Up',

  description: 'Get Pop Up',

  inputs: {
    name: {
      type: 'string'
    },
    isDeleted: {
      type: 'boolean'
    }
  },

  exits: {
    nonSuccess: {
      description: 'Error'
    },
  },

  fn: async function({ name, isDeleted }, exits) {
    const user = this.req.user.fullName;

    try {
      let res;

      if (name) {
        sails.log.info(`${user}: Getting popUp: ${name}`);
        res = await PopUp.findOne({
          name
        });
      } else {
        sails.log.info(`${user}: Getting all popUps`);
        res = await PopUp.find({ isDeleted }).populateAll();
      }

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

