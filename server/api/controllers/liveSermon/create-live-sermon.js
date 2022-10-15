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
      streamLink,
      speaker,
      sermonSeries,
      sermonDate,
      sermonPassage,
      sermonDescription,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Creating live sermon: ${title}`);

    try {
      let res;
      let lastUpdatedBy = user

      res = await LiveSermon.create({
        title,
        sermonNotes,
        streamLink,
        speaker,
        sermonSeries,
        sermonDate,
        sermonPassage,
        sermonDescription,
        lastUpdatedBy,
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
