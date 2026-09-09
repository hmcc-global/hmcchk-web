const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const DOWNLOAD_URL_EXPIRY_SECONDS = 60 * 60;

module.exports = {
  friendlyName: 'Presign R2 download',

  description:
    'Create a short-lived URL for reading an object that is not exposed on the public domain',

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
  },

  fn: async function ({ key }, exits) {
    const { R2_BUCKET } = process.env;

    if (!R2_BUCKET) {
      throw new Error('R2_BUCKET must be set');
    }

    const url = await getSignedUrl(
      sails.helpers.r2.getClient(),
      new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }),
      { expiresIn: DOWNLOAD_URL_EXPIRY_SECONDS }
    );

    return exits.success({ url, key, expiresIn: DOWNLOAD_URL_EXPIRY_SECONDS });
  },
};
