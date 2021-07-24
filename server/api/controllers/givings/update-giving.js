module.exports = {
  friendlyName: "Update memberships",

  description: "Update memberships",

  inputs: {
    params: {
      required: false,
      type: "json",
    },
  },

  exits: {
    success: {
      description: "Membership records updated successfully",
    },
    invalid: {
      description: "Failed to update membership record",
    },

    missingRequiredFields: {
      statusCode: 409,
      description: "Please fill in the required fields.",
    },

    invalidBaptismId: {
      statusCode: 409,
      description: "The membershipId is invalid",
    },
  },

  fn: async function ({ params }, exits) {
    if (params.id) {
      let membershipId = params.id;
      try {
        delete params.id;
        let data = await Membership.updateOne({
          _id: membershipId,
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
