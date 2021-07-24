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
    classAttendance: {
      type: "json",
    },
    baptismDate: {
      type: "string",
    },
    baptismPlace: {
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

  fn: async function (
    { officialName, userId, classAttendance, baptismDate, baptismPlace },
    exits
  ) {
    try {
      const newBaptism = await Baptism.create({
        officialName,
        userId,
        classAttendance,
        baptismDate,
        baptismPlace,
      });

      // update user if baptised
      if (baptismDate != null && baptismPlace != "") {
        await User.updateOne({ id: userId, isDeleted: false }).set({
          isBaptised: true,
        });
      }

      return exits.success(newBaptism);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
