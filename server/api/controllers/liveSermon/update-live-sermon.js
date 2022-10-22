module.exports = {
  friendlyName: 'Update Live sermon',

  description: 'Update Live sermon',

  inputs: {
    id: {
      required: true,
      type: 'string',
    },
    title: {
      required: false,
      type: 'string',
    },
    sermonNotes: {
      type: 'string',
    },
    streamLink: {
      type: 'string',
      required: true,
    },
    speaker: {
      type: 'string',
      required: true,
    },
    sermonSeries: {
      type: 'string',
    },
    sermonDateTime: {
      type: 'string',
      required: true,
    },
    sermonPassage: {
      type: 'string',
    },
    sermonDescription: {
      type: 'string',
    },
    isPublished: {
      type: 'boolean',
    },
    isDeleted: {
      type: 'boolean',
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error',
    },
    duplicateError: {
      description: 'Duplicate data found',
      statusCode: 409,
    },
  },

  fn: async function (
    {
      id,
      title,
      sermonNotes,
      streamLink,
      speaker,
      sermonSeries,
      sermonDateTime,
      sermonPassage,
      sermonDescription,
      isPublished,
      isDeleted,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating liveSermon: ${title}`);
    sails.log.info(`Title: ${title},  Desc: ${sermonDescription}`);

    try {
      if (isDeleted && isPublished) {
        isPublished = false;
      }

      if (isPublished) {
        res = await LiveSermon.update({ isPublished: true }).set({
          isPublished: false,
        });
      }
      let lastUpdatedBy = user;

      const existing = await LiveSermon.updateOne({ id }).set({
        title,
        sermonNotes,
        streamLink,
        speaker,
        sermonSeries,
        sermonDateTime,
        sermonPassage,
        sermonDescription,
        isPublished,
        lastUpdatedBy,
        isDeleted,
      });

      if (!existing) {
        throw `Name: ${title}, with id: ${id} , live sermon doesn't exist`;
      }

      return exits.success(existing);
    } catch (err) {
      sails.log(err);
      if (err.code === 'E_UNIQUE') {
        return exits.duplicateError(err);
      }
      return exits.nonSuccess(err);
    }
  },
};
