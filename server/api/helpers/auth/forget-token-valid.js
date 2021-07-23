const { DateTime } = require("luxon");
const md5 = require("md5");

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
      const now = DateTime.now()
        .minus({ hours: sails.config.custom.tokenExpiryHours })
        .toMillis();
      const existing = await ResetPwdToken.findOne({
        token: md5(token),
        createdAt: { ">=": now },
      });

      if (!existing) throw new Error("Token invalid");

      return exits.success(existing);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
