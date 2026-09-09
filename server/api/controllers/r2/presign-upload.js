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
    fileSize: {
      type: 'number',
      required: true,
    },
    folder: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: '{ uploadUrl, key, publicUrl, cacheControl }',
    },
    badRequest: {
      responseType: 'badRequest',
      description: 'Unsupported folder or content type, or file too large',
    },
    error: {
      description: 'Error',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const result = await sails.helpers.r2.presignUpload.with(inputs);
      return exits.success(result);
    } catch (err) {
      if (err.exit === 'fileTooLarge' || err.code === 'E_INVALID_ARGINS') {
        return exits.badRequest(err.raw || err.message);
      }
      sails.log(err);
      return exits.error(err);
    }
  },
};
