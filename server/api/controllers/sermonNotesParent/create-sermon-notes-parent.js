module.exports = {
  friendlyName: 'Create Sermon Notes Parent',

  description: 'Create Sermon Notes Parent',

  inputs: {
    sermonId: {
      type: 'string',
      unique: true,
    },
    title: {
      required: true,
      type: 'string',
    },
    subtitle: {
      required: false,
      type: 'string',
    },
    speaker: {
      required: true,
      type: 'string',
    },
    sermonSeries: {
      required: false,
      type: 'string',
    },
    date: {
      type: 'string',
      required: true,
    },
    imageLink: {
      required: false,
      type: 'string',
    },
    originalContent: {
      required: true,
      type: 'string',
    },
    sermonLink: {
      required: true,
      type: 'string',
    },
    serviceType: {
      required: true,
      type: 'string',
    },
    passage: {
      required: true,
      type: 'string',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
    isPublished: {
      type: 'boolean',
      defaultsTo: false,
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
      sermonId,
      title,
      subtitle,
      speaker,
      sermonSeries,
      date,
      imageLink,
      originalContent,
      userContent,
      sermonLink,
      serviceType,
      passage,
      isDeleted,
      isPublished,
    },
    exits
  ) {
    sails.log.info(`Creating sermonNoteParent: ${sermonId}`);

    try {
      const checkSermonNote = await SermonNotesParent.find({
        sermonId: sermonId,
        isDeleted: false
      });
      if(checkSermonNote.length > 0){
        return exits.duplicateError('Sermon note already exists');
      }

      const newSermonNotesParent = await SermonNotesParent.create({
        sermonId,
        title,
        subtitle,
        speaker,
        sermonSeries,
        date,
        imageLink,
        originalContent,
        userContent,
        sermonLink,
        serviceType,
        passage,
        isDeleted,
        isPublished,
      }).fetch();

      if (!newSermonNotesParent) {
        return exits.nonSuccess(err);
      }

      return exits.success(newSermonNotesParent);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
