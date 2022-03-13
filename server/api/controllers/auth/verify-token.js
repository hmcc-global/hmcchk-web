module.exports = {
  friendlyName: "Verify JWT",
  description: "Verify a JWT token.",
  inputs: {
    token: {
      type: "string",
      friendlyName: "token",
      description: "A reference to the request object (req).",
      required: true,
    },
  },
  exits: {
    invalid: {
      description: "Invalid token",
    },
    forbidden: {
      statusCode: 403,
      description: "Forbidden",
    },
    unauthorised: {
      statusCode: 401,
      description: "Unauthorised",
    },
  },
  fn: async function ({ token }, exits) {
    if (token == null || token === "") return exits.unauthorised();
    try {
      let valid = await sails.helpers.auth.verifyJwt(token);
      return exits.success(valid);
    } catch (err) {
      sails.log.error(err);
      return exits.invalid(err);
    }
  },
};
