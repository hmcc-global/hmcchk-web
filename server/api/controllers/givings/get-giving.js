module.exports = {
  friendlyName: "Get giving",

  description: "Get giving",

  inputs: {
    givingId: {
      required: false,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Giving records returned successfully",
    },
    invalid: {
      description: "Failed to retrieve giving record",
    },
  },
  fn: async function ({ givingId }, exits) {
    try {
      if (givingId) {
        let data = await Giving.find({ _id: givingId, isDeleted: false });
        if (data.length === 0) throw "giving record not found";
        return exits.success(data);
      }

      let data = await Giving.find({ isDeleted: false });
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
