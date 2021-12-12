module.exports = {
  friendlyName: "Create giving record",

  description: "Create a giving record",

  inputs: {
    userId: {
      type: "string",
    },
    tithely: {
      type: "json",
      columnType: "array",
    },
    aliases: {
      type: "json",
      columnType: "array",
    },
  },

  exits: {
    success: {
      description: "Giving record created successfully",
    },
    invalid: {
      responseType: "badRequest",
      description: "Failed to create giving record",
    },

    duplicateRecords: {
      statusCode: 409,
      description: "There is a duplicate record",
    },
  },

  fn: async function ({ userId, tithely, aliases }, exits) {
    try {
      const newGiving = await Giving.create({
        userId,
        tithely,
        aliases,
      });

      return exits.success(newGiving);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
