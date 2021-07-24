module.exports = {
  friendlyName: "Create memberships",

  description: "Create a member record",

  inputs: {
    officialName: {
      type: "string",
    },
    userId: {
      type: "string",
    },
    classDate: {
      type: "json",
    },
    classAttendance: {
      type: "boolean",
    },
    recognitionDate: {
      type: "string",
    },
    recommitmentDate: {
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Membership record created successfully",
    },
    invalid: {
      responseType: "badRequest",
      description: "Failed to create membership record",
    },

    duplicateRecords: {
      statusCode: 409,
      description: "There is a duplicate record",
    },
  },

  fn: async function (
    {
      officialName,
      userId,
      classDate,
      classAttendance,
      recognitionDate,
      recommitmentDate,
    },
    exits
  ) {
    try {
      const newMembership = await Membership.create({
        officialName,
        userId,
        classDate,
        classAttendance,
        recognitionDate,
        recommitmentDate,
      });

      // connecting
      // let temp = await Baptism.find({ userId: userId });
      // await User.updateOne({ _id: userId }).set({ baptismId: temp._id });

      // update user if member
      if (recognitionDate != null) {
        await User.updateOne({ id: userId, isDelete: false }).set({
          isMember: true,
        });
      }

      return exits.success(newMembership);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
