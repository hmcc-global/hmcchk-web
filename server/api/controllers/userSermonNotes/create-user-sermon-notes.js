module.exports = {
  friendlyName: 'Create user sermon notes',

  description: 'Create a new user sermon notes',

  inputs: {
    sermonNoteId: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
      required: true,
    },
    editContended: {
      type: 'string',
    },
    themes: {
      type: 'json',
      defaultsTo: [],
    },
    stickyNote: {
      type: 'json',
      defaultsTo: [],
    },
  },

  exits: {
    success: {
      description: 'New user sermon note was created successfully.',
    },
    error: {
      description: 'Failed to create new user sermon note.',
    },
  },

  fn: async function (
    { sermonNoteId, userId, editContended, themes, stickyNote },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Creating user sermon note: ${sermonNoteId}`);

    try {
      const newChildSermon = await UserSermonNotes.create({
        sermonNoteId,
        userId,
        editContended,
        themes,
        stickyNote,
      }).fetch();

      if (!newChildSermon) {
        return exits.nonSuccess(err);
      }

      return exits.success(newChildSermon);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
