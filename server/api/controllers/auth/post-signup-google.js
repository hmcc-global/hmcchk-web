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

      const userRecord = await User.findOne({
        email: newEmailAddress,
      });

      if (userRecord) {
        throw "Unable to sign up, email already exists!";
      }

      const payload = {
        email: data.email,
        fullName: data.name,
      };

      return exits.success(payload);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
