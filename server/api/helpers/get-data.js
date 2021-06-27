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

    const response = await axios.get(url, { params: parameters});

    let parsedPayload;
    try {
      if (typeof(response.data) === 'string') {
        let payload = response.data.substring(1);
        parsedPayload = JSON.parse(payload);
      } else {
        parsedPayload = response.data;
      }
    } catch (unusedErr) {
      try {
        parsedPayload = JSON.parse(response.data);
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
