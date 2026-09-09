module.exports = {
  friendlyName: 'Presign R2 upload',

  description: 'Issue a presigned PUT URL for uploading a file to R2',

  inputs: {
    fileName: {
      type: 'string',
      required: true,
    },
    contentType: {
      type: 'string',
      required: true,
    },
    folder: {
      type: 'string',
      required: false,
    },
  },

  exits: {
    success: {
      description: '{ uploadUrl, key, publicUrl }',
    },
    error: {
      description: 'Error',
    },
  },

  fn: async function ({ fileName, contentType, folder }, exits) {
    try {
      const result = await sails.helpers.r2.presignUpload.with({
        fileName,
        contentType,
        folder,
      });
      return exits.success(result);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
