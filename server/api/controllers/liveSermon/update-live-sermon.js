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
    sermonDate: {
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
    lastUpdatedBy: {
      type: 'string',
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
      sermonDate,
      sermonPassage,
      sermonDescription,
      isPublished,
      lastUpdatedBy,
      isDeleted,
    },
    exits
  ) {
    // const user = this.req.user.fullName;
    // sails.log.info(`${user}: Updating popUp: ${name}`);
    // sails.log.info(`Title: ${title}, ImageLink: ${imageLink}, Desc: ${description}, ButtonTexts: ${buttonTexts}, ButtonLinks: ${buttonLinks}`);

    try {
      if (isDeleted && isPublished) {
        isPublished = false;
      }

      if (isPublished) {
        res = await LiveSermon.update({ isPublished: true }).set({
          isPublished: false,
        });
      }

      if(!lastUpdatedBy) {
        lastUpdatedBy = "test"
      }

      const existing = await LiveSermon.updateOne({ id }).set({
        title,
        sermonNotes,
        streamLink,
        speaker,
        sermonSeries,
        sermonDate,
        sermonPassage,
        sermonDescription,
        isPublished,
        lastUpdatedBy,
        isDeleted,
      });

      if (!existing) {
        throw `Name: ${title}, live sermon doesn't exist`;
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
