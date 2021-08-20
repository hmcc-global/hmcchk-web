const md5 = require("md5");

module.exports = {
  friendlyName: "Send password recovery email",

  description:
    "Send a password recovery notification to the user with the specified email address.",

  inputs: {
    email: {
      description:
        "The email address of the alleged user who wants to recover their password.",
      example: "rydahl@example.com",
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description:
        "The email address might have matched a user in the database.  (If so, a recovery email was sent.)",
    },
  },

  fn: async function ({ email }, exits) {
    try {
      email = email.toLowerCase();

      // Find the record for this user.
      // (Even if no such user exists, pretend it worked to discourage sniffing.)
      const userRecord = await User.findOne({ email });
      if (!userRecord) {
        return exits.success();
      }

      // Come up with a pseudorandom, probabilistically-unique token for use
      // in our password recovery email.
      const resetToken = sails.helpers.strings.random("alphanumeric", 32);

      // Store the token in the db
      // (This allows us to look up the user when the link from the email is clicked.)
      await ResetPwdToken.create({
        email: email,
        token: md5(resetToken),
        expiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
      });

      // Send recovery email
      await sails.helpers.sendTemplateEmail.with({
        to: email,
        subject: "Password reset instructions",
        template: "email-reset-password",
        templateData: {
          fullName: userRecord.fullName,
          token: resetToken,
        },
      });

      return exits.success();
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
