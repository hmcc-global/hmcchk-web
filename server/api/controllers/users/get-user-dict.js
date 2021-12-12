module.exports = {
  friendlyName: "Get users",

  description: "Get users and return in the form of a dictionary / JSON",

  inputs: {},

  exits: {
    success: {
      description: "User account returned successfully",
    },
    invalid: {
      description: "Failed to retrieve user account",
    },
  },
  fn: async function (inputs, exits) {
    try {
      let data = await User.find({ isDeleted: false }).populateAll();

      const newArray = data.map(
        ({
          password,
          accessType,
          formSubmitted,
          membershipInfo,
          baptismInfo,
          emailProofToken,
          hasFilledProfileForm,
          emailStatus,
          address,
          birthday,
          phoneNumber,
          ...item
        }) => item
      );

      sails.log.info("Retrieving users");

      return exits.success(newArray);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
