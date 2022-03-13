module.exports = {
  friendlyName: "Change User password",

  description: "Change password for the logged-in user.",

  inputs: {
    userId: {
      required: true,
      type: "string",
    },
    currentPassword: {
      required: true,
      type: "string",
      description: "The current, unencrypted password.",
    },
    newPassword: {
      required: true,
      type: "string",
      description: "The new, unencrypted password.",
    },
  },

  exits: {
    success: {
      description: "Password changed successfully.",
    },
    notFound: {
      description:
        "The provided user id does not match any user in the database.",
    },
    badCombo: {
      description:
        "The provided user id and password combination does not match any user in the database.",
      responseType: "unauthorized",
    },
  },

  fn: async function ({ userId, currentPassword, newPassword }, exits) {
    try {
      const userRecord = await User.findOne({ _id: userId, isDeleted: false });
      if (!userRecord) {
        return exits.notFound();
      }

      // Verify the current password.
      await sails.helpers.passwords
        .checkPassword(currentPassword, userRecord.password)
        .intercept("incorrect", exits.badCombo());

      // TODO: server-side validate new password

      // Hash the new password and store it.
      await User.updateOne({ id: userId, isDeleted: false }).set({
        password: await sails.helpers.passwords.hashPassword(newPassword),
      });

      return exits.success();
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
