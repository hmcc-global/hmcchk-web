module.exports = {
  friendlyName: "Get users",

  description: "Get users",

  inputs: {
    userId: {
      required: false,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "User account returned successfully",
    },
    invalid: {
      description: "Failed to retrieve user account",
    },
  },
  fn: async function ({ userId }, exits) {
    try {
      if (userId) {
        let data = await User.find({ id: userId, isDeleted: false }).populateAll();
        if (data.length === 0) throw "user not found";
        return exits.success(data);
      }

      //let data = await User.find({ isDeleted: false }).populate("baptismInfo");
      let data = await User.find({ isDeleted: false }).populateAll();

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
