module.exports = {
  friendlyName: "Update users",

  description: "Update users",

  inputs: {
    params: {
      required: false,
      type: "json",
    },
  },

  exits: {
    success: {
      description: "User account updated successfully",
    },
    invalid: {
      description: "Failed to update user account",
    },

    missingRequiredFields: {
      statusCode: 409,
      description: "Please fill in the required fields.",
    },

    invalidUserId: {
      statusCode: 409,
      description: "The userId is invalid",
    },
  },

  fn: async function ({ params }, exits) {
    const { id: userId, ...toUpdate } = params;
    if (userId) {
      try {
        let data = await User.updateOne({
          _id: userId,
          isDeleted: false,
        }).set(toUpdate);
        if (data != null) {
          return exits.success(data);
        }
        return exits.invalid();
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    }
    sails.log.error("missingRequiredFields");
    return exits.invalid();
  },
};
