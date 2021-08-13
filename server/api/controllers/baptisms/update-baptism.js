module.exports = {
  friendlyName: "Update baptisms",

  description: "Update baptisms",

  inputs: {
    params: {
      required: false,
      type: "json",
    },
  },

  exits: {
    success: {
      description: "Baptism records updated successfully",
    },
    invalid: {
      description: "Failed to update baptism record",
    },

    missingRequiredFields: {
      statusCode: 409,
      description: "Please fill in the required fields.",
    },
  },

  fn: async function ({ params }, exits) {
    const { id: baptismId, ...toUpdate } = params;
    if (baptismId) {
      try {
        let data = await Baptism.updateOne({
          _id: baptismId,
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
    sails.log.error(err);
    sails.log.error("missingRequiredFields");
    return exits.invalid();
  },
};
