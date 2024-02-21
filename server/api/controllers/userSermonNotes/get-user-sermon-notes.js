const UserSermonNotes = require('../../models/UserSermonNotes');

/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Get user sermon note',

  description: 'Get user sermon note',

  inputs: {
    userSermonNoteId: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'User sermon note returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve user sermon note',
    },
  },
  fn: async function ({ userSermonNoteId }, exits) {
    try {
      if (userSermonNoteId) {
        let data = await UserSermonNotes.find({
          _id: userSermonNoteId,
        });
        if (data.length === 0) throw 'user sermon note not found';
        return exits.success(data);
      }

      let data = await UserSermonNotes.find({ isDeleted: false });
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
