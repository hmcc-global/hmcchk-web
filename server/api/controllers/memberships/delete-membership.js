module.exports = {
  friendlyName: "Delete membership",

  description: "Delete membership",

  inputs: {
    membershipId: {
      required: true,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Membership record deleted successfully",
    },
    invalid: {
      description: "Failed to delete membership record",
    },

    missingRequiredFields: {
      statusCode: 409,
      description: "Please fill in the required fields.",
    },
  },

  fn: async function ({ membershipId }, exits) {
    if (membershipId) {
      try {
        let data = await Membership.updateOne({
          _id: membershipId,
          isDeleted: false,
        }).set({
          isDeleted: true,
        });
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
