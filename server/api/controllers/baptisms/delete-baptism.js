module.exports = {
  friendlyName: "Delete baptisms",

  description: "Delete baptisms",

  inputs: {
    baptismId: {
      required: true,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Baptism record deleted successfully",
    },
    invalid: {
      description: "Failed to delete baptism record",
    },

    missingRequiredFields: {
      statusCode: 409,
      description: "Please fill in the required fields.",
    },
  },

  fn: async function ({ baptismId }, exits) {
    if (baptismId) {
      try {
        let data = await Baptism.updateOne({
          _id: baptismId,
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
