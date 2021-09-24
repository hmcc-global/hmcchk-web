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
    if (params.id) {
      let givingId = params.id;
      try {
        delete params.id;
        let data = await Giving.updateOne({
          _id: givingId,
          isDeleted: false,
        }).set(params);
        if (data != null) {
          return exits.success(data);
        }
        return exits.invalid();
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    } else {
      throw "missingRequiredFields";
    }
  },
};
