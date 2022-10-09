module.exports = {
  friendlyName: 'Create Live Sermon',

  description: 'Create Live Sermon',

  inputs: {
    title: {
      type: 'string',
      required: true,
    },
    sermonNotes: {
      type: 'string',
    },
    sermonLink: {
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
  },

  fn: async function (
    {
      title,
      sermonNotes,
      sermonLink,
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
    // sails.log.info(`${user}: Creating live sermon: ${name}`);

    try {
      let res;

      if (isPublished) {
        res = await LiveSermon.update({ isPublished: true }).set({
          isPublished: false,
        });
      }

      res = await LiveSermon.create({
        title,
        sermonNotes,
        sermonLink,
        speaker,
        sermonSeries,
        sermonDate,
        sermonPassage,
        sermonDescription,
        isPublished,
        lastUpdatedBy,
        isDeleted,
      }).fetch();

      if (!res) {
        return exits.nonSuccess(err);
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
