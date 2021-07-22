module.exports = {
  friendlyName: "View users",

  description: "",

  inputs: {
    userId: {
      required: true,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "User account deleted successfully",
    },
    invalid: {
      description: "Failed to delete user account",
    },

    missingRequiredFields: {
      statusCode: 409,
      description: "Please fill in the required fields.",
    },
  },

  fn: async function ({ userId }, exits) {
    if (userId) {
      try {
        let data = await User.updateOne(userId).set({ isDeleted: true });
        sails.log(data);
        return exits.success(data);
      } catch (err) {
        sails.log(err);
        return exits.invalid();
      }
    } else {
      throw "missingRequiredFields";
    }
  },
};
