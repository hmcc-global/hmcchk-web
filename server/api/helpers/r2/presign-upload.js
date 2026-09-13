const { randomUUID } = require('crypto');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const UPLOAD_URL_EXPIRY_SECONDS = 15 * 60;
const CACHE_CONTROL = 'public, max-age=31536000, immutable';
const MB = 1024 * 1024;

const MAX_BYTES_BY_CONTENT_TYPE = {
  'image/png': 25 * MB,
  'image/jpeg': 25 * MB,
  'image/webp': 25 * MB,
  'image/gif': 25 * MB,
  'audio/mpeg': 500 * MB,
  'audio/mp3': 500 * MB,
};

const toSafeFileName = (fileName) =>
  fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'file';

module.exports = {
  friendlyName: 'Presign R2 upload',

  description:
    'Create a short-lived URL the browser can PUT a file to, plus the public URL it will be served from',

  inputs: {
    fileName: {
      type: 'string',
      required: true,
      maxLength: 255,
    },
    contentType: {
      type: 'string',
      required: true,
      isIn: Object.keys(MAX_BYTES_BY_CONTENT_TYPE),
    },
    fileSize: {
      type: 'number',
      required: true,
      min: 1,
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
    invalidFolder: {
      description:
        'folder is not in sails.config.custom.permissions.r2UploadFolders',
    },
    invalidContentType: {
      description: 'contentType is not allowed for this folder',
    },
    fileTooLarge: {
      description: 'fileSize exceeds the limit for this content type',
    },
  },

  fn: async function ({ fileName, contentType, fileSize, folder }, exits) {
    const { R2_BUCKET, R2_PUBLIC_BASE_URL } = process.env;

    if (!R2_BUCKET || !R2_PUBLIC_BASE_URL) {
      throw new Error('R2_BUCKET and R2_PUBLIC_BASE_URL must be set');
    }

    const folders = sails.config.custom.permissions.r2UploadFolders;
    const folderRules = Object.hasOwn(folders, folder)
      ? folders[folder]
      : undefined;
    if (!folderRules) {
      return exits.invalidFolder();
    }
    if (!folderRules.contentTypes.includes(contentType)) {
      return exits.invalidContentType({ allowed: folderRules.contentTypes });
    }

    const maxBytes = MAX_BYTES_BY_CONTENT_TYPE[contentType];
    if (fileSize > maxBytes) {
      return exits.fileTooLarge({ maxBytes });
    }

    const suffix = randomUUID().slice(0, 8);
    const key = `${folder}/${Date.now()}-${suffix}-${toSafeFileName(fileName)}`;

    // The presigner unsigns Content-Type by default; signing it, Content-Length and
    // Cache-Control makes R2 reject a PUT whose headers differ from what was approved
    // here, so the browser must send cacheControl back verbatim.
    const uploadUrl = await getSignedUrl(
      sails.helpers.r2.getClient(),
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        ContentType: contentType,
        ContentLength: fileSize,
        CacheControl: CACHE_CONTROL,
      }),
      {
        expiresIn: UPLOAD_URL_EXPIRY_SECONDS,
        signableHeaders: new Set([
          'cache-control',
          'content-length',
          'content-type',
        ]),
      }
    );

    const publicUrl = `${R2_PUBLIC_BASE_URL.replace(/\/+$/, '')}/${key}`;

    return exits.success({
      uploadUrl,
      key,
      publicUrl,
      cacheControl: CACHE_CONTROL,
    });
  },
};
