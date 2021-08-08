module.exports = {
  friendlyName: "Create memberships",

  description: "Create a member record",

  inputs: {
    officialName: {
      type: "string",
      required: true,
    },
    userId: {
      type: "string",
      required: true,
    },
    classAttendance: {
      type: "json",
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
  },

  fn: async function (
    {
      officialName,
      userId,
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
        classAttendance,
        recognitionDate,
        recommitmentDate,
      });

      // update user if member
      if (recognitionDate != null) {
        await User.updateOne({ id: userId, isDeleted: false }).set({
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
