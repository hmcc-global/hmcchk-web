/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Get all sermon notes',

  description:
    'Get all parent sermon notes and applicable child sermon notes for a specific user',

  inputs: {
    userId: {
      required: false,
      type: 'string',
      description: 'ID of the user to check if there are saved sermon notes',
    },
  },

  exits: {
    success: {
      description: 'All sermon notes returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve sermon notes',
    },
  },

  fn: async function ({ userId }, exits) {
    try {
      // Step 1: Fetch all parent sermon notes that are not deleted and order them by date in descending order
      let parentSermonNotes = await SermonNotesParent.find({
        isDeleted: false,
      }).sort('date DESC');

      // Step 2: If userId is provided, fetch all related user sermon notes in a single query
      let allRelatedUserSermonNotes = [];
      if (userId) {
        allRelatedUserSermonNotes = await UserSermonNotes.find({
          userId: userId,
          isDeleted: false,
          sermonId: parentSermonNotes.map((note) => note.sermonId),
        });
      }

      // Step 3: Enrich each parent note with userSermonNote data
      let data = parentSermonNotes.map((parentNote) => {
        let userSermonNote = allRelatedUserSermonNotes.find(
          (userNote) => userNote.sermonId === parentNote.sermonId
        );

        return {
          ...parentNote,
          isSaved: !!userSermonNote,
          childUpdatedAt: userSermonNote ? userSermonNote.updatedAt : null,
        };
      });

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
