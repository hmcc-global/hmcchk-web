module.exports = {
  friendlyName: 'Update site link',

  description:
    'Update a Site Link label, enable/disable it, or soft-delete it.',

  inputs: {
    id: { type: 'string', required: true },
    label: { type: 'string' },
    isEnabled: { type: 'boolean' },
    isDeleted: { type: 'boolean' },
  },

  exits: {
    success: {
      description: 'Site link updated.',
    },
    invalid: {
      statusCode: 400,
      description: 'No fields were supplied to update.',
    },
    notFound: {
      statusCode: 404,
      description: 'Site link not found.',
    },
    error: {
      description: 'Failed to update site link.',
    },
  },

  fn: async function ({ id, label, isEnabled, isDeleted }, exits) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating site link: ${id}`);

    try {
      const changes = {};
      if (label !== undefined) changes.label = label;
      if (isEnabled !== undefined) changes.isEnabled = isEnabled;
      if (isDeleted !== undefined) changes.isDeleted = isDeleted;

      // Fail fast rather than reporting success for a request that changes
      // nothing, which otherwise reads as a saved edit to the caller.
      if (Object.keys(changes).length === 0) {
        return exits.invalid('No fields were supplied to update.');
      }

      const updated = await SiteLink.updateOne({ id }).set(changes);
      if (!updated) return exits.notFound('Site link not found.');

      return exits.success(updated);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
