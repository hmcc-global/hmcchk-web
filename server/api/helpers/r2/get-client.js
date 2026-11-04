const { S3Client } = require('@aws-sdk/client-s3');

let client;

module.exports = {
  friendlyName: 'Get R2 client',

  description:
    'Return a shared S3-compatible client for the Cloudflare R2 bucket',

  sync: true,

  inputs: {},

  exits: {
    success: {
      description: 'S3Client instance',
    },
  },

  fn: function (inputs, exits) {
    if (!client) {
      const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } =
        process.env;

      if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
        throw new Error(
          'R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be set'
        );
      }

      client = new S3Client({
        region: 'auto',
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: R2_ACCESS_KEY_ID,
          secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
      });
    }

    return exits.success(client);
  },
};
