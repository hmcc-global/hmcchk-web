const { DateTime } = require('luxon');
const he = require('he');

const getSpeakers = (id, speakers) => {
  return id.reduce((acc, s) => {
    return [...acc, speakers[s]];
  },[]);
};

const transformSermon = (sermon, speakers, sermonSeries) => {
  return {
    id: sermon.id,
    title: he.decode(sermon.title.rendered),
    speaker: getSpeakers(sermon.wpfc_preacher, speakers),
    datePreached: DateTime.fromSeconds(sermon.sermon_date),
    sermonSeries: sermonSeries[sermon.wpfc_sermon_series[0]],
    sermonDesc: sermon.sermon_description,
    sermonAudioUrl: sermon.sermon_audio,
    sermonAudioDuration: sermon.sermon_audio_duration,
    sermonVideoUrl: sermon.sermon_video_url,
    status: sermon.status
  };
};

module.exports = {

  friendlyName: 'Get all available Sermons',

  description: 'Get all available Sermons',

  inputs: {},

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.info(`Getting all sermons..`);

    const url = sails.config.custom.sermons.host;

    try {
      const data = await sails.helpers.getData(url);
      const speakerList = await sails.helpers.sermons.getSpeaker();
      const sermonSeries = await sails.helpers.sermons.getSermonSeries();
      let transformedSermons = data.map((s) => transformSermon(s, speakerList, sermonSeries));

      return exits.success(transformedSermons);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }

};
