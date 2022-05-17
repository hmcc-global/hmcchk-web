const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Verify a JWT token.',
  inputs: {
    token: {
      type: 'string',
      friendlyName: 'token',
      description: 'A reference to the request object (req).',
      required: true,
    },
  },
  exits: {
    invalid: {
      description: 'Invalid token',
    },
  },
  fn: async function ({ token }, exits) {
    if (token == null || token === '') return exits.invalid('Unauthorised');

    try {
      let valid = jwt.verify(token, process.env.JWT_KEY);
      if (valid == null) return exits.invalid('Forbidden');

      // at this point should return a user object
      // with id, email and accessType
      let user = await User.findOne(valid.id);

      if (!user) return exits.invalid('Unauthorised');

      const {
        createdAt,
        updatedAt,
        password: userPassword,
        emailProofToken,
        ...result
      } = user;

      const whitelistData = await Whitelist.findOne({
        eventName: 'ignite-2022',
        data: { contains: valid.emailAddress },
      });
      result.whitelisted = whitelistData ? true : false;

      return exits.success(result);
    } catch (err) {
      if ((err instanceof jwt.TokenExpiredError, err)) {
        return exits.invalid('token-expired');
      }
      return exits.invalid(err);
    }
  },
};
