const { validateTarget } = require('../../lib/site-links');

module.exports = {
  friendlyName: 'Create site link target',

  description:
    'Create a scheduled target for a Site Link, after validating the typed destination, safe URL/path, date range and schedule-overlap rules.',

  inputs: {
    siteLink: { type: 'string', required: true },
    destinationType: { type: 'string', required: true },
    formId: { type: 'string' },
    destinationUrl: { type: 'string' },
    activeFrom: { type: 'string' },
    activeUntil: { type: 'string' },
  },

  exits: {
    success: {
      description: 'Target created.',
    },
    invalid: {
      statusCode: 400,
      description: 'The target payload failed validation.',
    },
    notFound: {
      statusCode: 404,
      description: 'Site link or referenced form not found.',
    },
    error: {
      description: 'Failed to create target.',
    },
  },

  fn: async function (inputs, exits) {
    const user = this.req.user.fullName;
    const {
      siteLink,
      destinationType,
      formId,
      destinationUrl,
      activeFrom,
      activeUntil,
    } = inputs;

    try {
      const link = await SiteLink.findOne({ id: siteLink, isDeleted: false });
      if (!link) return exits.notFound('Site link not found.');

      const payload = {
        destinationType,
        formId,
        destinationUrl,
        activeFrom: activeFrom || '',
        activeUntil: activeUntil || '',
      };

      const siblings = await SiteLinkTarget.find({
        siteLink,
        isDeleted: false,
      });

      const validationError = validateTarget(payload, siblings, null);
      if (validationError) return exits.invalid(validationError);

      if (destinationType === 'form') {
        const form = await Form.findOne({ id: formId, isDeleted: false });
        if (!form) return exits.notFound('Selected form not found.');
      }

      const created = await SiteLinkTarget.create({
        siteLink,
        destinationType,
        formId: destinationType === 'form' ? formId : '',
        destinationUrl: destinationType === 'url' ? destinationUrl : '',
        activeFrom: payload.activeFrom,
        activeUntil: payload.activeUntil,
        updatedBy: user,
      }).fetch();

      return exits.success(created);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
