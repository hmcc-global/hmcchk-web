module.exports = {
  friendlyName: 'Get prayers',

  description: 'Get all prayers',

  inputs: {
    prayer: {
      type: 'string',
    },
    isDeleted: {
      type: 'boolean',
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error retrieving prayers.',
    },
    success: {
      description: 'Successfully retrieved prayers.',
    },
  },

  fn: async function ({ name, isDeleted }, exits) {
    const user = this.req.user.fullName;

    try {
      let res;

      if (name) {
        sails.log.info(`${user}: Getting prayers: ${prayer}`);
        res = await Easter.findOne({ prayer });
      } else {
        sails.log.info(`${user}: Getting all prayers`);
        res = await Easter.find({ isDeleted }).populateAll();
      }

      if (!res) {
        return exits.nonSuccess(err);
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
