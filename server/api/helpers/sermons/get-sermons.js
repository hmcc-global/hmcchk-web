const { DateTime } = require('luxon');
const he = require('he');

const arrayReducer = (id, list) => {
  return id.reduce((acc, s) => {
    return [...acc, list.find(l => l.id === s)];
  },[]);
};

const transformSermon = (sermon, speakers, sermonSeries) => {
  return {
    id: sermon.id,
    title: he.decode(sermon.title.rendered),
    speaker: arrayReducer(sermon.wpfc_preacher, speakers),
    datePreached: DateTime.fromSeconds(sermon.sermon_date),
    sermonSeries: arrayReducer(sermon.wpfc_sermon_series, sermonSeries),
    sermonDesc: sermon.sermon_description,
    sermonAudioUrl: sermon.sermon_audio,
    sermonAudioDuration: sermon.sermon_audio_duration,
    sermonVideoUrl: sermon.sermon_video_url,
    status: sermon.status
  };
};

module.exports = {

  friendlyName: 'Get sermons',

  description: 'Get all sermons',

  inputs: {
  },

  exits: {},

  fn: async function(inputs, exits) {
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
      const data = await sails.helpers.getData(url);
      const speakersList = await sails.helpers.sermons.getSpeakers();
      const sermonSeriesList = await sails.helpers.sermons.getSermonSeries();
      let transformedSermons = data.map((s) => transformSermon(s, speakersList, sermonSeriesList));

      if (transformSermon.length > 0) {
        sails.cache.set(key, transformedSermons);
        sails.log.info('Cached sermons');
      }

      return exits.success(transformedSermons);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }

};
