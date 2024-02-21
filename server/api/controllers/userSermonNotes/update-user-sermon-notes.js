const UserSermonNotes = require('../../models/UserSermonNotes');

module.exports = {
  friendlyName: 'Update user sermon note',

  description: 'Update user sermon note',

  inputs: {
    params: {
      required: false,
      type: 'json',
    },
  },

  exits: {
    success: {
      description: 'User sermon note updated successfully',
    },
    invalid: {
      description: 'Failed to update user sermon note',
    },

    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ params }, exits) {
    const { id: userSermonNoteId, ...toUpdate } = params;
    if (userSermonNoteId) {
      try {
        let data = await UserSermonNotes.updateOne({
          _id: userSermonNoteId,
          isDeleted: false,
        }).set(toUpdate);
        if (data) {
          return exits.success(data);
        }
        return exits.invalid();
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    }
    sails.log.error(err);
    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
