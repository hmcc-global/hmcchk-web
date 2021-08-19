module.exports = {
  friendlyName: "Email confirmation",

  description: "Email confirmation",

  inputs: {
    token: {
      description: "The token sent to the user email.",
      type: "string",
      required: true,
    },
  },

  exits: {
    invalidOrExpiredToken: {
      responseType: "expired",
      description:
        "The provided token is expired, invalid, or already used up.",
    },
  },

  fn: async function ({ token }, exits) {
    try {
      // If no token was provided, this is automatically invalid.
      if (!token) {
        throw "invalidOrExpiredToken";
      }

      // Get the user with the matching email token.
      var user = await User.findOne({ emailProofToken: token });

      // If no such user exists, or their token is expired, bail.
      if (!user || user.emailProofTokenExpiresAt <= Date.now()) {
        throw "invalidOrExpiredToken";
      }

      if (user.emailStatus === "unconfirmed") {
        //  ┌─┐┌─┐┌┐┌┌─┐┬┬─┐┌┬┐┬┌┐┌┌─┐  ╔═╗╦╦═╗╔═╗╔╦╗ ╔╦╗╦╔╦╗╔═╗  ╦ ╦╔═╗╔═╗╦═╗  ┌─┐┌┬┐┌─┐┬┬
        //  │  │ ││││├┤ │├┬┘││││││││ ┬  ╠╣ ║╠╦╝╚═╗ ║───║ ║║║║║╣   ║ ║╚═╗║╣ ╠╦╝  ├┤ │││├─┤││
        //  └─┘└─┘┘└┘└  ┴┴└─┴ ┴┴┘└┘└─┘  ╚  ╩╩╚═╚═╝ ╩   ╩ ╩╩ ╩╚═╝  ╚═╝╚═╝╚═╝╩╚═  └─┘┴ ┴┴ ┴┴┴─┘
        // If this is a new user confirming their email for the first time,
        // then just update the state of their user record in the database,
        // store their user id in the session (just in case they aren't logged
        // in already), and then redirect them to the "email confirmed" page.
        await User.updateOne({ id: user.id }).set({
          emailStatus: "confirmed",
          emailProofToken: "",
          emailProofTokenExpiresAt: 0,
        });
        this.req.session.userId = user.id;

        // Send "welcome" email
        await sails.helpers.sendTemplateEmail.with({
          to: user.email,
          subject: "Welcome to HMCC!",
          template: "email-welcome-new-account",
          templateData: {
            fullName: user.fullName,
            token: user.emailProofToken,
          },
        });

        sails.log.info(`${user.email} confirmed.`);
        return exits.success(true);
      }

      return exits.success(true);
    } catch (err) {
      sails.log(err);
      return exits.error(false);
    }
  },
};
