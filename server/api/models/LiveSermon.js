module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    sermonNotes: {
      type: 'string',
    },
    sermonLink: {
      type: 'string',
    },
    speaker: {
      type: 'string',
      isIn:[
        'Pastor Bo Zhu',
        'Pastor Seth S. Kim',
      ],
    },
    guestSpeaker: {
      type: 'string',
    },
    sermonSeries: {
      type: 'string',
    },
    sermonDate: {
      type: 'ref',
      columnType: 'datetime',
    },
    sermonPassage: {
      type: 'string',
    },
    sermonDescription: {
      type: 'string',
    },
  },
};
