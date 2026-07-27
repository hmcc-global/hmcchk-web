const { validateTarget } = require('../../lib/site-links');

module.exports = {
  friendlyName: 'Update site link target',

  description:
    'Update or disable a Site Link target. A disable request (isDeleted=true) is applied directly; any destination/schedule change is re-validated.',

  inputs: {
    id: { type: 'string', required: true },
    destinationType: { type: 'string' },
    formId: { type: 'string' },
    destinationUrl: { type: 'string' },
    activeFrom: { type: 'string' },
    activeUntil: { type: 'string' },
    isDeleted: { type: 'boolean' },
  },

  exits: {
    success: { description: 'Target updated.' },
    invalid: {
      statusCode: 400,
      description: 'The target payload failed validation.',
    },
    notFound: {
      statusCode: 404,
      description: 'Target or referenced form not found.',
    },
    error: { description: 'Failed to update target.' },
  },

  fn: async function (inputs, exits) {
    const user = this.req.user.fullName;
    const { id, isDeleted } = inputs;

    try {
      const existing = await SiteLinkTarget.findOne({ id });
      if (!existing) return exits.notFound('Target not found.');

      // Disabling never requires a valid destination, so apply it directly.
      if (isDeleted === true) {
        const disabled = await SiteLinkTarget.updateOne({ id }).set({
          isDeleted: true,
          updatedBy: user,
        });
        return exits.success(disabled);
      }

      const pick = (next, prev) => (next !== undefined ? next : prev);
      const payload = {
        destinationType: pick(inputs.destinationType, existing.destinationType),
        formId: pick(inputs.formId, existing.formId),
        destinationUrl: pick(inputs.destinationUrl, existing.destinationUrl),
        activeFrom: pick(inputs.activeFrom, existing.activeFrom) || '',
        activeUntil: pick(inputs.activeUntil, existing.activeUntil) || '',
      };

      const siblings = await SiteLinkTarget.find({
        siteLink: existing.siteLink,
        isDeleted: false,
      });

      const validationError = validateTarget(payload, siblings, id);
      if (validationError) return exits.invalid(validationError);

      if (payload.destinationType === 'form') {
        const form = await Form.findOne({ id: payload.formId });
        if (!form) return exits.notFound('Selected form not found.');
      }

      const updated = await SiteLinkTarget.updateOne({ id }).set({
        destinationType: payload.destinationType,
        formId: payload.destinationType === 'form' ? payload.formId : '',
        destinationUrl:
          payload.destinationType === 'url' ? payload.destinationUrl : '',
        activeFrom: payload.activeFrom,
        activeUntil: payload.activeUntil,
        isDeleted: pick(isDeleted, existing.isDeleted),
        updatedBy: user,
      });

      return exits.success(updated);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
