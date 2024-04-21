module.exports = {
  friendlyName: 'Update Sermon Note parent',

  description: 'Update Sermon Note parent',

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
      required: true,
      type: 'string',
    },
    imageLink: {
      required: false,
      type: 'string',
    },
    originalContent: {
      required: true,
      type: 'json',
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
      sermonLink,
      serviceType,
      passage,
      isDeleted,
      isPublished,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating Sermon Notes: ${title}`);
    sails.log.info(`Title: ${title},  Desc: ${subtitle}`);

    try {
      if (isDeleted && isPublished) {
        isPublished = false;
      }

      if (isPublished) {
        res = await SermonNotesParent.update({ isPublished: true }).set({
          isPublished: false,
        });
      }

      const existing = await SermonNotesParent.updateOne({ sermonId: sermonId }).set({
        title,
        subtitle,
        speaker,
        sermonSeries,
        date,
        imageLink,
        originalContent,
        sermonLink,
        serviceType,
        passage,
        isDeleted,
        isPublished,
      });

      if (!existing) {
        throw `Name: ${title}, with id: ${sermonId} , Sermon note parent doesn't exist`;
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
