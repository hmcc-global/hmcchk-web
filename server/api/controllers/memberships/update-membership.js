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
  },

  fn: async function ({ params }, exits) {
    const { id: membershipId, ...toUpdate } = params;
    // TODO-aparedan: I don't think this should update an entry. I think it should create a new entry so that there is track record of user's membership recommitment dates
    if (membershipId) {
      try {
        let data = await Membership.updateOne({
          _id: membershipId,
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
