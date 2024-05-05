module.exports = {
  friendlyName: 'Redirect to original URL',

  description:
    'Check if short URL exists and redirect it to original if possible',

  inputs: {
    urlCode: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Shorten URL redirected successfully.',
    },
    error: {
      description: 'There was an issue with redirecting the URL',
    },
    invalid: {
      description: 'There is an issue with your request',
    },
    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ urlCode }, exits) {
    if (!urlCode) {
      sails.log.error('missingRequiredFields');
      return exits.invalid('');
    }

    try {
      const redirectUrl = await Url.findOne({ urlCode });

      if (redirectUrl) {
        sails.log.info(
          `Redirecting ${urlCode} to ${redirectUrl.originalUrl}...`
        );
        return exits.success(redirectUrl.originalUrl);
      } else {
        return exits.invalid('No URL found');
      }
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
