module.exports = {
  friendlyName: 'Create a new shorten URL',

  description:
    'Create a new shorten URL entry and save to db for future redirection',

  inputs: {
    title: {
      type: 'string',
      required: true,
    },
    baseUrl: {
      type: 'string',
      required: true,
    },
    originalUrl: {
      type: 'string',
      required: true,
    },
    urlCode: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'URL shorten successfully.',
    },
    error: {
      description: 'There was an issue with shortening the URL',
    },
    invalid: {
      description: 'There is an issue with your request',
    },
    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ title, baseUrl, originalUrl, urlCode }, exits) {
    if (!title || !originalUrl) {
      sails.log.error('missingRequiredFields');
      return exits.invalid();
    }

    const user = this.req.user.fullName;

    try {
      // check for existing originalUrl
      const existingUrl = await Url.findOne({ originalUrl });

      if (existingUrl) {
        // if existing, return it
        return exits.success(existingUrl);
      } else {
        let validUrlCode;

        // check if urlCode is taken or not
        if (urlCode) {
          const existingCustom = await Url.findOne({ urlCode });
          if (existingCustom) {
            sails.log.error(`custom URL Code already existed: ${urlCode}`);
            return exits.invalid();
          } else {
            validUrlCode = urlCode;
          }
        } else {
          validUrlCode = sails.helpers.strings.random('url-friendly', 10);
        }

        // if no existing is found, create a new shorten url
        const shortUrl = `${baseUrl}/${validUrlCode}`;

        const newUrl = await Url.create({
          title,
          originalUrl,
          urlCode: validUrlCode,
          shortUrl,
          createdBy: user,
        });

        return exits.success(newUrl);
      }
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
