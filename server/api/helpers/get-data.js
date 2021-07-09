const axios = require('axios');

module.exports = {
  
  friendlyName: 'Get Data from REST API',

  description: 'Get Data from REST API',

  inputs: {
    url: {
      required: true,
      type: 'string',
      description: 'URL of REST API'
    },
    parameters: {
      required: false,
      type: 'json',
      description: 'Parameters of REST API'
    }
  },

  exits: {
    targetErr: {
      description: 'Encountered error calling target'
    },
    nonSuccess: {
      description: 'Response does not indicate success'
    },
    noData: {
      description: 'No Data returned'
    }
  },

  fn: async function({ url, parameters }, exits) {

    let pageNumber = 1;
    let additionalParams = {
      // eslint-disable-next-line camelcase
      per_page: 100,
      page: pageNumber,
      ...parameters
    };

    let response = await axios.get(url, { params: additionalParams });
    let data = response.data;
    let totalPages = response.headers['x-wp-totalpages'];

    while (totalPages > 1) {
      additionalParams.page = ++pageNumber;
      response = await axios.get(url, { params: additionalParams });
      if (typeof(data) === 'string') {
        data = data.substring(0, data.length-1).concat(response.data.replace('[',','));
      } else {
        data = [...data, ...response.data];
      }
      totalPages--;
    }

    let parsedPayload;
    try {
      if (typeof(data) === 'string') {
        let payload = data.substring(1);
        parsedPayload = JSON.parse(payload);
      } else {
        parsedPayload = data;
      }
    } catch (unusedErr) {
      try {
        parsedPayload = JSON.parse(data);
      } catch (err) {
        sails.log.error(`Error calling API for data from ${url}`);
        sails.log(err);
        return exits.targetErr(err);
      }
    }

    if (!parsedPayload) {
      return exits.noData();
    }

    if (response.status >= 400) {
      if (parsedPayload.error && parsedPayload.error.message) {
        return exits.nonSuccess(parsedPayload.error.message);
      }
      return exits.nonSuccess(parsedPayload);
    }

    if (!(parsedPayload instanceof Array)) {
      sails.log(parsedPayload);
      sails.log('Made into array');
      parsedPayload = [parsedPayload];
    }
    return exits.success(parsedPayload);
  }

};
