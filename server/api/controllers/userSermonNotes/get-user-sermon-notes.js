/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Get user sermon note',

  description: 'Get user sermon note',

  inputs: {
    sermonId: {
      required: true,
      type: 'string',
    },
    userId: {
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
  fn: async function ({ sermonId, userId }, exits) {
    try {
      if (sermonId && userId) {
        let data = await UserSermonNotes.find({
          sermonId: sermonId,
          userId: userId,
          isDeleted: false,
        });
        if (data.length === 0) throw 'user sermon note not found';
        return exits.success(data);
      }

      let data = await UserSermonNotes.find({
        userId: userId,
        isDeleted: false,
      });
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
