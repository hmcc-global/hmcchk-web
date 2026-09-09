const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const UPLOAD_URL_EXPIRY_SECONDS = 15 * 60;

const toSafeFileName = (fileName) =>
  fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');

module.exports = {
  friendlyName: 'Presign R2 upload',

  description:
    'Create a short-lived URL the browser can PUT a file to, plus the public URL it will be served from',

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
      defaultsTo: 'uploads',
    },
  },

  exits: {
    success: {
      description: '{ uploadUrl, key, publicUrl }',
    },
  },

  fn: async function ({ fileName, contentType, folder }, exits) {
    const { R2_BUCKET, R2_PUBLIC_BASE_URL } = process.env;

    if (!R2_BUCKET || !R2_PUBLIC_BASE_URL) {
      throw new Error('R2_BUCKET and R2_PUBLIC_BASE_URL must be set');
    }

    const safeFolder = folder.replace(/^\/+|\/+$/g, '');
    const key = `${safeFolder}/${Date.now()}-${toSafeFileName(fileName)}`;

    const uploadUrl = await getSignedUrl(
      sails.helpers.r2.getClient(),
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        ContentType: contentType,
      }),
      { expiresIn: UPLOAD_URL_EXPIRY_SECONDS }
    );

    const publicUrl = `${R2_PUBLIC_BASE_URL.replace(/\/+$/, '')}/${key}`;

    return exits.success({ uploadUrl, key, publicUrl });
  },
};
