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
  friendlyName: "Post login google",

  description: "Post login google",

  inputs: {
    tokenId: {
      required: true,
      type: "string",
      description: "token ID of Google user",
    },
  },

  exits: {
    success: {
      description:
        "The requesting user agent has been successfully logged in using Google.",
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

      const { email: emailAddress } = data;

      const userRecord = await User.findOne({
        email: emailAddress.toLowerCase(),
      });

      // If there was no matching user, respond thru the "badCombo" exit.
      if (!userRecord || userRecord.password !== "") {
        throw "badCombo";
      }

      sails.log.info(`${emailAddress} logged in.`);

      const token = await sails.helpers.auth.generateJwt(
        userRecord.id,
        userRecord.email,
        userRecord.accessType
      );

      return exits.success(token);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
