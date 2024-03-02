module.exports = {
  friendlyName: 'Get Sermon Notes Parent',

  description: 'Get Sermon Notes Parent',

  inputs: {
    sermonNoteId: {
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
  fn: async function ({ sermonNoteId }, exits) {
    try {
      if (sermonNoteId) {
        let data = await SermonNotesParent.find({
          _id: sermonNoteId,
          isDeleted: false,
        });
        if (data.length === 0) throw 'Sermon note parent record not found';
        return exits.success(data);
      }

      let data = await SermonNotesParent.find({ isDeleted: false });
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
