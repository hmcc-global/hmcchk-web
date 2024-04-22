module.exports = {
  friendlyName: 'Create user sermon notes',

  description: 'Create a new user sermon notes',

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
      type: 'json',
    },
    themes: {
      type: 'string',
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
    duplicateError: {
      description: 'Duplicate data found',
      statusCode: 409,
    },
  },

  fn: async function (
    { sermonId, userId, editedContent, themes, stickyNote },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Creating user sermon note: ${sermonId}`);

    try {
      const checkSermonNote = await UserSermonNotes.find({
        sermonId: sermonId,
        userId: userId,
        isDeleted: false
      });
      sails.log(checkSermonNote)
      if(checkSermonNote.length > 0){
        return exits.duplicateError('Sermon note already exists');
      }

      const newChildSermon = await UserSermonNotes.create({
        sermonId,
        userId,
        editedContent,
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
