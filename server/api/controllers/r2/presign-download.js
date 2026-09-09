module.exports = {
  friendlyName: 'Presign R2 download',

  description: 'Issue a presigned GET URL for reading a private object from R2',

  inputs: {
    key: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: '{ url, key, expiresIn }',
    },
    error: {
      description: 'Error',
    },
  },

  fn: async function ({ key }, exits) {
    try {
      const result = await sails.helpers.r2.presignDownload(key);
      return exits.success(result);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
