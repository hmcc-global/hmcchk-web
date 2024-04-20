module.exports = {
  friendlyName: 'Get Sermon Notes Parent',

  description: 'Get Sermon Notes Parent',

  inputs: {
    sermonId: {
      required: false,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Sermon notes parent returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve Sermon notes parents',
    },
  },
  fn: async function ({ sermonId }, exits) {
    try {
      if (sermonId) {
        let data = await SermonNotesParent.findOne({
          sermonId: sermonId,
          isDeleted: false,
        });
        if (data.length === 0) throw 'Sermon note parent record not found';
        return exits.success(data);
      }
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
