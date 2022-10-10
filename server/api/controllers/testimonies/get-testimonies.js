module.exports = {
  friendlyName: 'Get testimonies',

  description: 'Get all testimonies',

  inputs: {
    testimony: {
      type: 'string',
    },
    isDeleted: {
      type: 'boolean',
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error retrieving testimonies.',
    },
    success: {
      description: 'Successfully retrieved testimonies.',
    },
  },

  fn: async function ({ name, isDeleted }, exits) {
    const user = this.req.user.fullName;

    try {
      let res;

      if (name) {
        sails.log.info(`${user}: Getting testimony: ${testimony}`);
        res = await Testimonies.findOne({ testimony });
      } else {
        sails.log.info(`${user}: Getting all testimonies`);
        res = await Testimonies.find({ isDeleted }).populateAll();
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
