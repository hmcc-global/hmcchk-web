module.exports = {
  friendlyName: "Update users",

  description: "",

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
      description: "The user id is invalid",
    },
  },

  fn: async function ({ params }, exits) {
    if (params.id) {
      let userId = params.id;
      try {
        delete params.id;
        let data = await User.updateOne({ _id: userId, isDeleted: false }).set(
          params
        );
        if (data != null) {
          return exits.success(data);
        }
        return exits.invalid();
      } catch (err) {
        if ((err.code = "E_CANNOT_INTERPRET_AS_OBJECTID")) {
          throw "invalidUserId";
        }
        sails.log(err);
        return exits.invalid();
      }
    } else {
      throw "missingRequiredFields";
    }
  },
};
