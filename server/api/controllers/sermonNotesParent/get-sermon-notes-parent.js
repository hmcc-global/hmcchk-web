module.exports = {
  friendlyName: 'Get Sermon Notes Parent',

  description: 'Get Sermon Notes Parent',

  inputs: {
    sermonId: {
      required: false,
      type: 'string',
    },
    includeDeleted: {
      required: false,
      type: 'boolean',
      defaultsTo: false,
    },
  },

  exits: {
    success: {
      description: 'Sermon notes parent returned successfully',
    },
    notFound: {
      description: 'No sermon note parent records found',
    },
    invalid: {
      description: 'Failed to retrieve sermon notes parents',
    },
  },

  fn: async function ({ sermonId, includeDeleted }, exits) {
    try {
      let query = {};
      if (!includeDeleted) {
        query.isDeleted = false;
      }

      if (sermonId) {
        query.sermonId = sermonId;
      }

      const data = await SermonNotesParent.find(query);

      if (data.length === 0) {
        return exits.notFound();
      }

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
