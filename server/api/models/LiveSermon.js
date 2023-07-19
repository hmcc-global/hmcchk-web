module.exports = {
  attributes: {
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
      type: 'ref',
      columnType: 'datetime',
      required: true,
    },
    sermonPassage: {
      type: 'string',
    },
    sermonDescription: {
      type: 'string',
    },
    lastUpdatedBy: {
      type: 'string',
    },
    streamStartTime: {
      type: 'ref',
      columnType: 'datetime',
    },
    streamEndTime: {
      type: 'string',
      columnType: 'datetime',
    },
  },
};
