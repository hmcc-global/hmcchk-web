module.exports = {
  friendlyName: "Delete giving",

  description: "Delete giving",

  inputs: {
    givingId: {
      required: true,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Giving record deleted successfully",
    },
    invalid: {
      description: "Failed to delete giving record",
    },

    missingRequiredFields: {
      statusCode: 409,
      description: "Please fill in the required fields.",
    },
  },

  fn: async function ({ givingId }, exits) {
    if (givingId) {
      try {
        let data = await Giving.updateOne({
          userId: givingId,
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
