/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  sermons: {
    host: 'https://hongkong.hmcc.net/wp-json/wp/v2/wpfc_sermon'
  },

  speakers: {
    host: 'https://hongkong.hmcc.net/wp-json/wp/v2/wpfc_preacher'
  },

  sermonSeries: {
    host: 'https://hongkong.hmcc.net/wp-json/wp/v2/wpfc_sermon_series'
  }
};
