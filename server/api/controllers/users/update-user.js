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
      description: "Invalid user id.",
    },
  },

  fn: async function ({ params }, exits) {
    sails.log(params);
    if (params.id) {
      try {
        let data = await User.updateOne(params.id, params);

        sails.log(data);
        return exits.success(data);
      } catch (err) {
        sails.log(err);
        return exits.invalid();
      }
    } else {
      sails.log("error");
      throw "missingRequiredFields";
    }
  },
};
