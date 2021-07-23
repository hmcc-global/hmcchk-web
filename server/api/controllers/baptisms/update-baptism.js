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

    invalidBaptismId: {
      statusCode: 409,
      description: "The baptismId is invalid",
    },
  },

  fn: async function ({ params }, exits) {
    if (params.id) {
      let baptismId = params.id;
      try {
        delete params.id;
        let data = await Baptism.updateOne({
          _id: baptismId,
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
