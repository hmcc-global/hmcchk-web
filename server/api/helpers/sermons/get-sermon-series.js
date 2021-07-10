module.exports = {

  friendlyName: 'Get sermon series',

  description: 'Get sermon series',

  inputs: {
  },

  exits: {},

  fn: async function(inputs, exits) {
    sails.log.info(`Get sermon series..`);

    const key = 'sermonSeries';
    let result = sails.cache.get(key);
    if (result) {
      sails.log.info('Returning sermon series from cache');
      return exits.success(result);
    }

    let url = sails.config.custom.sermonSeries.host;

    try {
      const data = await sails.helpers.getData(url, parameters = { 'per_page': 100 });
      let transformedData = data.reduce((acc, {id, name, sermon_series_image_id: sermonSeriesImageId}) => {
        acc.push({
          id: id,
          name: name,
          imageId: sermonSeriesImageId
        });
        return acc;
      }, []);

      if (transformedData.length > 0) {
        sails.cache.set(key, transformedData);
        sails.log.info('Cached sermon series');
      }

      return exits.success(transformedData);
    } catch (err) {
      sails.log(err);
      return exits.success(err);
    }
  }

};

