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
      defaultsTo: "unconfirmed",
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
      type: "string", //stewardship, admin, alumni, signed, unsigned
      isIn: ["stewardship", "admin", "alumni", "signed", "unsigned"],
      defaultsTo: "unsigned",
      description: "The account types of the user and what access do they have",
    },
    fullName: {
      type: "string",
      required: true,
    },
    countryOfOrigin: {
      type: "string",
      required: true,
    },
    address: {
      type: "json",
    },
    birthday: {
      type: "ref",
      columnType: "datetime",
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
    ministryTeam: {
      type: "string",
      isIn: [
        "Intercessory Prayer Team",
        "Creatives",
        "Hospitality",
        "Band",
        "Audio/Visual",
        "Creatives Worship",
        "Multimedia",
        "Building Blocks",
      ],
    },
    phoneNumber: {
      type: "number",
      required: true,
    },
    formSubmitted: {
      //one-to-many
      type: "json",
    },
    membershipInfo: {
      //one-to-one
      collection: "Membership",
      via: "userId",
    },
    baptismInfo: {
      //one-to-one
      collection: "Baptism",
      via: "userId",
    },
    givingInfo: {
      //one-to-one
      //collection: "Giving",
      //via: "userId",
      type: "json",
      columnType: "array",
      defaultsTo: [],
    },
    emailProofToken: {
      type: "string",
      description:
        "A pseudorandom, probabilistically-unique token for use in our account verification emails.",
    },
    hasFilledProfileForm: {
      type: "boolean",
      description:
        "A flag to indicate whether a user has completed the profile form",
    },
  },
};
