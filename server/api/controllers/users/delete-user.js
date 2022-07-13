module.exports = {
  friendlyName: 'Delete users',

  description: 'Delete users',

  inputs: {
    userId: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'User account deleted successfully',
    },
    invalid: {
      description: 'Failed to delete user account',
    },

    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ userId }, exits) {
    if (userId) {
      try {
        const data = await User.updateOne({ _id: userId, isDeleted: false }).set({
          isDeleted: true,
        });
        if (data) {
          return exits.success(data);
        }
        return exits.invalid();
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    }
    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
