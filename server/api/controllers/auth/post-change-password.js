module.exports = {
  friendlyName: "Change User password",

  description: "Change user password",

  inputs: {
    token: {
      required: true,
      type: "string",
      description: "token given to the user through forget password",
    },
    password: {
      required: true,
      type: "string",
      description: "new password",
    },
  },

  exits: {
    success: {
      description: "Password changed successfully",
    },
  },

  fn: async function ({ token, password }, exits) {
    try {
      const valid = await sails.helpers.auth.forgetTokenValid(token);
      if (valid == null) {
        throw new Error("Token is no longer valid");
      }

      await User.update({ email: valid.email }).set({
        password: await sails.helpers.passwords.hashPassword(password),
      });

      return exits.success();
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
