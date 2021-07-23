module.exports = {
  friendlyName: "Create baptisms",

  description: "Create a baptism record",

  inputs: {
    officialName: {
      type: "string",
    },
    userId: {
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Baptism record created successfully",
    },
    invalid: {
      responseType: "badRequest",
      description: "Failed to create baptism record",
    },

    duplicateRecords: {
      statusCode: 409,
      description: "There is a duplicate record",
    },
  },

  fn: async function ({
    officialName,
    userId,
    classDate,
    classAttendance,
    baptismDate,
    baptismPlace,
  }) {
    try {
      const newBaptism = await Baptism.create({
        officialName,
        userId,
        classDate,
        classAttendance,
        baptismDate,
        baptismPlace,
      });

      sails.log(newBaptism);
      if (newBaptism) {
        return exits.success(newBaptism);
      }
      return exits.invalid();
    } catch (err) {
      return exits.invalid();
    }
  },
};
