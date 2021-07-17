module.exports = {
  attributes: {
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
    },
    accessType: {
      type: "string", //stewardship, admin, or member
      defaultsTo: "member",
    },
    fullName: {
      type: "string",
      required: true,
    },
    campus: {
      type: "string",
    },
    lifestage: {
      type: "string",
      required: true,
    },
    lifeGroup: {
      type: "string",
    },
    isMember: {
      type: "boolean",
      defaultsTo: false,
    },
    isBaptised: {
      type: "boolean",
      defaultsTo: false,
    },
    phoneNumber: {
      type: "number",
      required: true,
    },
    classesTaken: {
      type: "json",
    },
    eventsJoined: {
      type: "json",
    },
    membershipId: {
      type: "ref",
    },
    baptismId: {
      type: "ref",
    },
    financeId: {
      type: "json",
    },
  },
};
