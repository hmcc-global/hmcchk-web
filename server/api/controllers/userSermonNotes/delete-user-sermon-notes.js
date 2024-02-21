const UserSermonNotes = require('../../models/UserSermonNotes');

module.exports = {
  friendlyName: 'Delete user sermon notes',

  description: 'Delete user sermon notes',

  inputs: {
    userSermonNotesId: {
      required: true,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'User sermon note is deleted successfully',
    },
    invalid: {
      description: 'Failed to delete user sermon note',
    },

    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ userSermonNotesId }, exits) {
    if (userSermonNotesId) {
      try {
        let data = await UserSermonNotes.updateOne({
          _id: userSermonNotesId,
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
