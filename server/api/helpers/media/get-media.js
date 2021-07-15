const transformSizes = (sizes) => {
  if (sizes) {
    let result = {};
    for (const size in sizes) {
      result[size] = {
        file: sizes[size].file,
        width: sizes[size].width,
        height: sizes[size].height,
        mediaSubType: sizes[size].mime_type,
        sourceUrl: sizes[size].source_url,
      };
    }
    return result;
  }
  return null;
};

const transformMedia = (media) => {
  return {
    id: media.id,
    title: media.title.rendered,
    mediaType: media.media_type,
    mediaSubType: media.mime_type,
    sourceUrl: media.source_url,
    sizes: transformSizes(media.media_details.sizes),
  };
};

module.exports = {
  friendlyName: "Get sermons",

  description: "Get all sermons",

  inputs: {},

  exits: {
    nonSuccess: {
      description: "Error",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.info(`Get media..`);

    const key = "media";
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info("Returning media from cache");
      return exits.success(result);
    }

    sails.log.info(`Getting all media..`);

    const url = sails.config.custom.media.host;

    try {
      const data = await sails.helpers.getData(url);
      let transformedData = data.map((s) => transformMedia(s));

      if (transformedData.length > 0) {
        sails.cache.set(key, transformedData);
        sails.log.info("Cached media");
      }

      return exits.success(transformedData);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
