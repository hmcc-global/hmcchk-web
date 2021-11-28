module.exports = {
  friendlyName: "Get giving tuesday data",

  description: "Get the data for giving tuesday ",

  inputs: {},

  exits: {},

  fn: async function ({}, exits) {
    try {
      const data = await GivingTuesday.find();

      // If no form is found return error
      if (data === null) return exits.error("unauthorized access");

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
