const { DateTime } = require("luxon");
const he = require("he");

const transformWitnessVideo = (video, tags) => {
  let parsedStartDateStr = video.acf.date
    ? video.acf.date.split(" ").pop()
    : null;
  let parsedEndDateStr = video.acf.end_date
    ? video.acf.end_date.split(" ").pop()
    : null;
  
  const tagNames = video.tags.map((tagId) => tags[tagId]);

  return {
    id: video.id,
    slug: video.slug,
    title: he.decode(video.title.rendered),
    startDate: parsedStartDateStr
      ? DateTime.fromFormat(parsedStartDateStr, "M/dd/yyyy")
      : null,
    endDate: parsedEndDateStr
      ? DateTime.fromFormat(parsedEndDateStr, "M/dd/yyyy")
      : null,
    imageUrl: video.acf.image,
    description: he.decode(video.content.rendered),
    time: video.acf.time
      ? DateTime.fromFormat(video.acf.time, "t").toFormat("t")
      : null,
    videoLink: video.acf.link,
    status: video.status,
    tags: tagNames,
  };
};

module.exports = {
  friendlyName: "Get all available Witness Videos",

  description: "Get all available Witness Videos",

  inputs: {},

  exits: {
    nonSuccess: {
      description: "Error",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.info(`Get witness videos..`);

    const key = "witness-videos";
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info("Returning witness videos from cache");
      return exits.success(result);
    }

    sails.log.info(`Getting all witness videos..`);

    const postsUrl = sails.config.custom.posts.host;

    try {
      const data = await sails.helpers.getData(postsUrl, {
        // 220 is the category code for Witness Videos on WP
        categories: 220
      });
      const tags = await sails.helpers.witness.getTags();
      let transformedWitnessVideos = data.map((wv) => transformWitnessVideo(wv, tags));

      if (transformedWitnessVideos.length > 0) {
        sails.cache.set(key, transformedWitnessVideos);
        sails.log.info("Cached witness videos");
      }

      return exits.success(transformedWitnessVideos);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
