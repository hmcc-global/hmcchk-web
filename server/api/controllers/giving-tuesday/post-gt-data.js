module.exports = {
  friendlyName: "Create giving tuesday entry",

  description: "Create the giving tuesday collection",

  inputs: {
    givingData: {
      type: "json",
      required: true,
      description:
        "single giving tuesday entry to create collection, expects 4 values [cat1, cat2, cat3, donors]",
    },
  },

  exits: {},

  fn: async function ({ givingData }, exits) {
    try {
      const createdEntry = await GivingTuesday.create({ givingData });
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
