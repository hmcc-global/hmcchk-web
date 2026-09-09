module.exports = {
  friendlyName: 'Presign R2 upload',

  description: 'Issue a presigned PUT URL for uploading a file to R2',

  inputs: {
    fileName: {
      type: 'string',
      required: true,
      maxLength: 255,
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
    forbidden: {
      responseType: 'forbidden',
      description: 'User access type may not upload to this folder',
    },
    error: {
      description: 'Error',
    },
  },

  fn: async function (inputs, exits) {
    const allowedAccessTypes =
      sails.config.custom.permissions.r2UploadFolders[inputs.folder];

    if (!Array.isArray(allowedAccessTypes)) {
      return exits.badRequest(`Unsupported folder: ${inputs.folder}`);
    }
    if (!allowedAccessTypes.includes(this.req.user.accessType)) {
      return exits.forbidden();
    }

    try {
      const result = await sails.helpers.r2.presignUpload.with(inputs);
      sails.log.info(
        `R2 upload URL issued to user ${this.req.user.id} for ${result.key}`
      );
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
