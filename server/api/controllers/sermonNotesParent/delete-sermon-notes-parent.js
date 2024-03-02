module.exports = {
  friendlyName: 'Delete Sermon Notes Parent',

  description: 'Delete Sermon Notes Parent',

  inputs: {
    sermonNoteId: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Sermon Notes Parent record deleted successfully',
    },
    invalid: {
      description: 'Failed to delete Sermon Notes Parents record',
    },

    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ sermonNoteId }, exits) {
    if (sermonNoteId) {
      try {
        let data = await SermonNotesParent.updateOne({
          _id: sermonNoteId,
          isDeleted: false,
        }).set({
          isDeleted: true,
        });
        if (data != null) {
          return exits.success(data);
        }
        return exits.invalid();
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    }
    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
