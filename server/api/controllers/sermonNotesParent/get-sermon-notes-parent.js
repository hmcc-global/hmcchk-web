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
        let data = await SermonNotesParent.find({
          sermonId: sermonId,
          isDeleted: false,
        });
        if (data.length === 0) throw 'Sermon note parent record not found';
        return exits.success(data);
      }
      // in future iterations, we should not do this for better practice
      let data = await SermonNotesParent.find({
        isDeleted: false,
      });
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
