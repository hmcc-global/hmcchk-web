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
    sermonSeriesUrl: {
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
    streamStartTime: {
      type: 'string',
      required: true,
    },
    streamEndTime: {
      type: 'string',
      required: true,
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
      sermonSeriesUrl,
      sermonDateTime,
      sermonPassage,
      sermonDescription,
      streamStartTime,
      streamEndTime,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Creating live sermon: ${title}`);

    try {
      let res;

      let isPublished = false;
      let lastUpdatedBy = user;

      res = await LiveSermon.create({
        title,
        sermonNotes,
        streamLink,
        speaker,
        sermonSeries,
        sermonSeriesUrl,
        sermonDateTime,
        sermonPassage,
        sermonDescription,
        isPublished,
        lastUpdatedBy,
        streamStartTime,
        streamEndTime,
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
