module.exports = {
  friendlyName: 'Get live sermon',

  description: 'Get live sermon',

  inputs: {
    sermonId: {
      required: false,
      type: 'string',
    },
    isPublished: {
      required: false,
      type: 'boolean',
    }
  },

  exits: {
    success: {
      description: 'Live sermon returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve live sermon',
    },
  },
  fn: async function ({ sermonId, isPublished }, exits) {
    try {
      if (sermonId) {
        let data = await LiveSermon.find({
          _id: sermonId,
          isDeleted: false,
          isPublished
        }).populateAll();
        if (data.length === 0) {
          return exits.success([]);
        }
        return exits.success(data);
      }

      let data = await LiveSermon.find({ isDeleted: false, isPublished }).sort('updatedAt DESC').populateAll();
      sails.log.info('Retrieving live sermons');

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
