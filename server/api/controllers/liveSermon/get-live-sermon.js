module.exports = {
  friendlyName: "Get live sermon",

  description: "Get live sermon",

  inputs: {
    sermonId: {
      required: false,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Live sermon returned successfully",
    },
    invalid: {
      description: "Failed to retrieve live sermon",
    },
  },
  fn: async function ({ sermonId }, exits) {
    try {
      if (sermonId) {
        let data = await LiveSermon.find({
          _id: sermonId,
          isDeleted: false,
        }).populateAll();
        if (data.length === 0) throw "live sermon not found";
        return exits.success(data);
      }

      let data = await LiveSermon.find({ isDeleted: false }).populateAll();
      sails.log.info("Retrieving past live sermons");

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
