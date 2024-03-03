module.exports = {
  friendlyName: 'Update user sermon note',

  description: 'Update user sermon note',

  inputs: {
    sermonId: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
      required: true,
    },
    editedContent: {
      type: 'string',
    },
    themes: {
      type: 'string',
    },
    stickyNote: {
      type: 'json',
      defaultsTo: [],
    },
    isDeleted: { type: 'boolean' },
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

  fn: async function (
    { sermonId, userId, editedContent, themes, stickyNote, isDeleted },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating user sermon note: ${sermonId}`);

    if (sermonId && userId) {
      try {
        let data = await UserSermonNotes.updateOne({
          sermonId: sermonId,
          userId: userId,
          isDeleted: false,
        }).set({ editedContent, themes, stickyNote, isDeleted });
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
