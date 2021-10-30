module.exports = {
  friendlyName: "Update giving",

  description: "Update giving",

  inputs: {
    params: {
      required: false,
      type: "json",
    },
  },

  exits: {
    success: {
      description: "Giving records updated successfully",
    },
    invalid: {
      description: "Failed to update giving record",
    },

    missingRequiredFields: {
      statusCode: 409,
      description: "Please fill in the required fields.",
    },

    invalidGivingId: {
      statusCode: 409,
      description: "The givingId is invalid",
    },
  },

  fn: async function ({ params }, exits) {
    const { id: givingId, ...toUpdate } = params;
    if (givingId) {
      try {
        let data = await Giving.updateOne({
          _id: givingId,
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
