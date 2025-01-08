const { DateTime } = require('luxon');
const he = require('he');

// removes html elements and attempts to remove sermon series from title
// e.g. Sermon Series - Part 1: Sermon Title -> Part 1: Sermon Title
// e.g. Sermon Series - Part 1 -> Part 1
// e.g. Encounter: Sermon Title -> Encounter: Sermon Title
const parseSermonTitle = (title) => {
  // eslint-disable-next-line eqeqeq
  if (title == null) return '';

  const decodedTitle = he.decode(title);
  const pattern = /.*(Part \d+.*)/g;
  const captured = pattern.exec(decodedTitle);

  // eslint-disable-next-line eqeqeq
  return captured != null && captured[1] != null && captured[1] !== ''
    ? captured[1]
    : decodedTitle;
};

const parseSermonDescription = (sermonDesc) => {
  if (sermonDesc == null) return '';

  const pattern = /<p>(.*)<\/p>/i;
  const captured = pattern.exec(sermonDesc);

  return captured != null && captured[1] && captured[1] !== ''
    ? captured[1]
    : sermonDesc;
};

const arrayReducer = (id, list) => {
  return id.reduce((acc, s) => {
    return [...acc, list.find((l) => l.id === s)];
  }, []);
};

const getSermonPreachedDate = (sermon) => {
  if (sermon.acf.sermon_date_preached) {
    return DateTime.fromFormat(sermon.acf.sermon_date_preached, 'yyyyMMdd');
  }

  return DateTime.fromSeconds(sermon.sermon_date);
};

const transformSermon = (sermon, speakers, sermonSeries, serviceTypes) => {
  return {
    id: sermon.id,
    title: parseSermonTitle(sermon.title.rendered),
    speaker: arrayReducer(sermon.wpfc_preacher, speakers),
    datePreached: getSermonPreachedDate(sermon),
    serviceType: arrayReducer(sermon.wpfc_service_type, serviceTypes),
    passage: sermon.bible_passage,
    sermonSeries: arrayReducer(sermon.wpfc_sermon_series, sermonSeries),
    sermonDesc: parseSermonDescription(sermon.content.rendered),
    sermonAudioUrl: sermon.sermon_audio,
    sermonAudioDuration: sermon.sermon_audio_duration,
    sermonVideoUrl: sermon.sermon_video_url,
    prevSermon: sermon.previous_sermon,
    nextSermon: sermon.next_sermon,
    streamLink: sermon.acf.streaming_link,
    sermonNotes: sermon.acf.tithely_sermon_notes,
    streamTime:
      sermon.acf && sermon.acf.time && sermon.acf.time !== ''
        ? DateTime.fromFormat(sermon.acf.time, 'hh:mm:ss').toFormat('hh:mm a')
        : '',
    status: sermon.status,
    protected: sermon.content.protected
  };
};

module.exports = {
  friendlyName: 'Get sermons',

  description: 'Get all sermons',

  inputs: {},

  exits: {
    nonSuccess: {
      description: 'Error',
    },
  },

  fn: async function (inputs, exits) {
    sails.log.info(`Get sermons..`);

    const key = 'sermons';
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info('Returning sermons from cache');
      return exits.success(result);
    }

    sails.log.info(`Getting all sermons..`);

    const url = sails.config.custom.sermons.host;

    try {
      const data = await sails.helpers.getData(url, {
        password: process.env.SERMON_PASS
      });
      const speakersList = await sails.helpers.sermons.getSpeakers();
      const sermonSeriesList = await sails.helpers.sermons.getSermonSeries();
      const serviceTypesList = await sails.helpers.sermons.getServiceTypes();
      let transformedSermons = data.map((s) =>
        transformSermon(s, speakersList, sermonSeriesList, serviceTypesList)
      );

      if (transformedSermons.length > 0) {
        sails.cache.set(key, transformedSermons);
        sails.log.info('Cached sermons');
      }

      return exits.success(transformedSermons);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
