const { OAuth2Client } = require("google-auth-library");

const verify = async (client, token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

module.exports = {
  friendlyName: "Signup Google",

  description: "Sign up for a new user account using Google OAuth.",

  extendedDescription: `This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,

  inputs: {
    tokenId: {
      required: true,
      type: "string",
      description: "token ID of Google user",
    },
  },

  exits: {
    success: {
      description: "New user account was created successfully.",
    },
  },

  fn: async function ({ tokenId }, exits) {
    if (tokenId == null) {
      throw "missing Token ID";
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    try {
      const data = await verify(client, tokenId);
      if (!data) throw "Error verifying";

      const { email: emailAddress, name: fullName } = data;

      const newEmailAddress = emailAddress.toLowerCase();

      // Build up data for the new user record and save it to the database.
      // (Also use `fetch` to retrieve the new ID so that we can use it below.)
      const newUserRecord = await User.create(
        _.extend(
          {
            email: newEmailAddress,
            fullName,
            lifestage: "Focus",
            phoneNumber: 51747089,
          },
          sails.config.custom.verifyEmailAddresses
            ? {
                emailProofToken: await sails.helpers.strings.random(
                  "url-friendly"
                ),
                emailProofTokenExpiresAt:
                  Date.now() + sails.config.custom.emailProofTokenTTL,
                emailStatus: "unconfirmed",
              }
            : {}
        )
      )
        .intercept("E_UNIQUE", "emailAlreadyInUse")
        .intercept({ name: "UsageError" }, "invalid")
        .fetch();

      // Store the user's new id in their session.
      this.req.session.userId = newUserRecord.id;

      // In case there was an existing session (e.g. if we allow users to go to the signup page
      // when they're already logged in), broadcast a message that we can display in other open tabs.
      if (sails.hooks.sockets) {
        await sails.helpers.broadcastSessionChange(this.req);
      }

      // Send "welcome" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: "Welcome to HMCC!",
        template: "welcome-new-account",
        templateData: {
          fullName,
          token: newUserRecord.emailProofToken,
        },
      });

      return exits.success("signup with google success");
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
