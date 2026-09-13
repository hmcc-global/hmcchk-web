const { DateTime } = require('luxon');

// LiveSermon.sermonDateTime comes from a datetime-local input, so it is usually
// a naive string. Reading it as Hong Kong time keeps naive values on their own
// day and converts anything carrying an offset to the local service day.
const toServiceDate = (sermonDateTime) => {
  if (!sermonDateTime) return null;

  const serviceDate =
    sermonDateTime instanceof Date
      ? DateTime.fromJSDate(sermonDateTime).setZone('Asia/Hong_Kong')
      : DateTime.fromISO(sermonDateTime, { zone: 'Asia/Hong_Kong' });

  return serviceDate.isValid ? serviceDate.toFormat('yyyy-MM-dd') : null;
};

module.exports = {
  friendlyName: 'Resolve passage',

  description:
    'Resolve the bible passage for a service from its published sermon notes',

  inputs: {
    sermonDateTime: {
      type: 'ref',
      required: true,
      description: 'Date and time of the service',
    },
    fallbackPassage: {
      type: 'string',
      allowNull: true,
      description: 'Passage to keep when the service has no published notes',
    },
  },

  exits: {
    success: {
      description: 'Passage resolved',
    },
  },

  fn: async function ({ sermonDateTime, fallbackPassage }, exits) {
    const serviceDate = toServiceDate(sermonDateTime);
    if (!serviceDate) {
      return exits.success(fallbackPassage);
    }

    try {
      // A service can have more than one set of notes, and the spare ones are
      // test records, so only published notes count and the newest wins.
      const notes = await SermonNotesParent.find({
        where: {
          isDeleted: false,
          isPublished: true,
          date: serviceDate,
        },
        sort: [{ sermonId: 'DESC' }],
      });

      const passage = notes && notes[0] && notes[0].passage;
      return exits.success(passage ? passage : fallbackPassage);
    } catch (err) {
      sails.log(err);
      return exits.success(fallbackPassage);
    }
  },
};
