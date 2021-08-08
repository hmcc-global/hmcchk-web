module.exports = {
  friendlyName: "Get memberships",

  description: "Get memberships",

  inputs: {
    membershipId: {
      required: false,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Membership records returned successfully",
    },
    invalid: {
      description: "Failed to retrieve membership record",
    },
  },
  fn: async function ({ membershipId }, exits) {
    try {
      if (membershipId) {
        let data = await Membership.find({ membershipId, isDeleted: false });
        if (data.length === 0) throw "baptism record not found";
        return exits.success(data);
      }

      let data = await Membership.find({ isDeleted: false });
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
