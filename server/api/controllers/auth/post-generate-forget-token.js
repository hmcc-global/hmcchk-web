const md5 = require("md5");

module.exports = {
  friendlyName: "Forget password",

  description: "Forget password controller",

  inputs: {
    emailAddress: {
      required: true,
      type: "string",
      isEmail: true,
      description: "Email address of existing user",
    },
  },

  exits: {
    success: {
      description: "Reset Password Token created and sent",
    },
  },

  fn: async function ({ emailAddress }, exits) {
    const email = emailAddress.toLowerCase();

    try {
      const existing = await User.findOne({ email: email });
      if (!existing) throw new Error("Email doesn't exist");

      let resetToken = sails.helpers.strings.random("alphanumeric", 32);
      await ResetPwdToken.create({
        email: email,
        token: md5(resetToken),
      });
      // sails.log(resetToken);

      // TODO send email

      return exits.success();
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
