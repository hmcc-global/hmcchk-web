/* eslint-disable camelcase */
const axios = require('axios');

module.exports = {
  friendlyName: 'Generate GMAIL access token',

  description: 'Generate GMAIL access token, if expired, refresh and return new token',

  inputs: {
  },

  exits: {
    success: {
      description: 'Access token generated',
    },
  },

  fn: async function (_, exits) {
    const { data } = await axios.post(
      'https://www.googleapis.com/oauth2/v3/token',
      {
        client_id: process.env.EMAIL_CLIENT_ID,
        client_secret: process.env.EMAIL_CLIENT_SECRET,
        refresh_token: process.env.EMAIL_REFRESH_TOKEN,
        grant_type: 'refresh_token'
      }
    );
    return exits.success(data.access_token);
  }
};
