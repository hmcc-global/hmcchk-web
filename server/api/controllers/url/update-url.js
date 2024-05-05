module.exports = {
  friendlyName: 'Get all or specific URL for admin use',

  description:
    'Gets all url if id is not specified, finds a specific one otherwise',

  inputs: {
    id: {
      required: true,
      type: 'string',
    },
    baseUrl: { type: 'string' },
    originalUrl: { type: 'string' },
    urlCode: { type: 'string' },
  },

  exits: {
    success: {
      description: 'Short URL updated.',
    },
    error: {
      description: 'Failed to update short URL.',
    },
    invalidId: {
      statusCode: 409,
      description: 'The id is invalid',
    },
    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ id, baseUrl, originalUrl, urlCode }, exits) {
    const user = this.req.user.fullName;

    if (id) {
      try {
        const existing = await Url.updateOne({ id }).set({
          title,
          baseUrl,
          originalUrl,
          urlCode,
          lastUpdatedBy: user,
        });

        if (!existing) {
          sails.log.error('invalidId');
          return exits.error(err);
        }

        return exits.success(existing);
      } catch (err) {
        sails.log(err);
        return exits.error(err);
      }
    }

    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
