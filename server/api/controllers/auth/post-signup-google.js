const { OAuth2Client } = require("google-auth-library");

const verify = async () => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return { payload, userid };
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
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

    invalid: {
      responseType: "badRequest",
      description:
        "The provided fullName, password and/or email address are invalid.",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent.",
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: "The provided email address is already in use.",
    },
  },

  fn: async function ({ tokenId }) {
    if (tokenId == null) {
      throw "missing Token ID";
    }

    const client = new OAuth2Client(
      "99075377276-tklfjgh5rf0fp60bo9olmv78aa0chngu.apps.googleusercontent.com"
    );

    try {
      const data = await verify();
      sails.log(data);
      return exits.success("signup with google success");
    } catch (err) {
      sails.log(err);
    }

    return;
    const newEmailAddress = emailAddress.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    const newUserRecord = await User.create(
      _.extend(
        {
          emailAddress: newEmailAddress,
          password: await sails.helpers.passwords.hashPassword(password),
          accessType,
          fullName,
          lifestage,
          phoneNumber,
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

    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: "Please confirm your account",
        template: "email-verify-account",
        templateData: {
          fullName,
          token: newUserRecord.emailProofToken,
        },
      });
    } else {
      sails.log.info(
        "Skipping new account email verification... (since `verifyEmailAddresses` is disabled)"
      );
    }

    sails.log.info(`New user signup for ${emailAddress}.`);
  },
};
