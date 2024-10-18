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

      // Step 2: For each parent sermon note, if userId is provided, check for corresponding user sermon notes
      let data = await Promise.all(
        parentSermonNotes.map(async (parentNote) => {
          let isSaved = false;
          let childUpdatedAt = null;

          if (userId) {
            let userSermonNote = await UserSermonNotes.findOne({
              sermonId: parentNote.sermonId,
              userId: userId,
              isDeleted: false,
            });

            if (userSermonNote) {
              isSaved = true;
              childUpdatedAt = userSermonNote.updatedAt;
            }
          }

          // Step 3: Return the parent note along with isSaved and updatedAt from child (if applicable)
          return {
            ...parentNote,
            isSaved,
            childUpdatedAt,
          };
        })
      );

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
