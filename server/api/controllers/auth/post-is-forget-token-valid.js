module.exports = {
  friendlyName: "Is Forget Token Valid",

  description:
    "Checks if token is valid and not expired, returns the email of the user",

  inputs: {
    token: {
      required: true,
      type: "string",
      description: "token given to the user through forget password",
    },
  },

  exits: {
    success: {
      description: "Token is valid",
    },
  },

  fn: async function ({ token }, exits) {
    try {
      return exits.success(await sails.helpers.auth.forgetTokenValid(token));
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
