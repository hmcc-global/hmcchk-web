const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Generate JWT",
  description: "Generate a JWT token.",
  inputs: {
    id: {
      friendlyName: "userId",
      description: "the unique id of the user",
      type: "string",
      required: true,
    },
    emailAddress: {
      friendlyName: "Email Address",
      description: "the email address of the user",
      type: "string",
      required: true,
    },
    accessType: {
      friendlyName: "Access Type",
      description: "the access type permission of the user",
      type: "string",
      required: true,
    },
  },
  exits: {
    invalid: {
      description: "Invalid token or no authentication present.",
    },
  },
  fn: function ({ id, emailAddress, accessType }, exits) {
    try {
      const maxAge = 24 * 60 * 60 * 7; //token stays for 1 week (1 sec increment)
      const createToken = (id, emailAddress, accessType) => {
        return jwt.sign(
          {
            id: id,
            emailAddress: emailAddress,
            accessType: accessType,
          },
          process.env.JWT_KEY,
          { expiresIn: maxAge }
        );
      };
      const token = createToken(id, emailAddress, accessType);
      return exits.success(token);
    } catch {
      return exits.invalid();
    }
  },
};
