module.exports = {
  attributes: {
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    emailStatus: {
      type: "string",
      isIn: ["unconfirmed", "change-requested", "confirmed"],
      defaultsTo: "confirmed",
      description: "The confirmation status of the user's email address.",
      extendedDescription: `Users might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded
admin users).  When the email verification feature is enabled, new users created via the
signup form have \`emailStatus: 'unconfirmed'\` until they click the link in the confirmation email.
Similarly, when an existing user changes their email address, they switch to the "change-requested"
email status until they click the link in the confirmation email.`,
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
    emailProofToken: {
      type: "string",
      description:
        "A pseudorandom, probabilistically-unique token for use in our account verification emails.",
    },
  },
};
