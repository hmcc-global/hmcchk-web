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

  models: {
    /***************************************************************************
     *                                                                          *
     * To help avoid accidents, Sails automatically sets the automigration      *
     * strategy to "safe" when your app lifts in production mode.               *
     * (This is just here as a reminder.)                                       *
     *                                                                          *
     * More info:                                                               *
     * https://sailsjs.com/docs/concepts/models-and-orm/model-settings#?migrate *
     *                                                                          *
     ***************************************************************************/
    migrate: "safe",

    /***************************************************************************
     *                                                                          *
     * If, in production, this app has access to physical-layer CASCADE         *
     * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
     * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
     * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
     * choose to keep this enabled.)                                            *
     *                                                                          *
     ***************************************************************************/
    // cascadeOnDestroy: false,
  },
  /**************************************************************************
   *                                                                         *
   * The base URL to use during development.                                 *
   *                                                                         *
   * • No trailing slash at the end                                          *
   * • `http://` or `https://` at the beginning.                             *
   *                                                                         *
   * > This is for use in custom logic that builds URLs.                     *
   * > It is particularly handy for building dynamic links in emails,        *
   * > but it can also be used for user-uploaded images, webhooks, etc.      *
   *                                                                         *
   **************************************************************************/
  baseUrl: "http://localhost:3000",

  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  admin: {
    email: "web@hongkong.hmcc.net",
  },

  sermons: {
    host: "https://hongkong.sub.hmcc.net/wp-json/wp/v2/wpfc_sermon",
  },

  speakers: {
    host: "https://hongkong.sub.hmcc.net/wp-json/wp/v2/wpfc_preacher",
  },

  sermonSeries: {
    host: "https://hongkong.sub.hmcc.net/wp-json/wp/v2/wpfc_sermon_series",
  },

  serviceTypes: {
    host: "https://hongkong.sub.hmcc.net/wp-json/wp/v2/wpfc_service_type",
  },

  media: {
    host: "https://hongkong.sub.hmcc.net/wp-json/wp/v2/media",
  },

  announcements: {
    host: "https://hongkong.sub.hmcc.net/wp-json/wp/v2/posts",
  },

  pages: {
    host: "https://hongkong.sub.hmcc.net/wp-json/wp/v2/pages",
  },

  // Whether to require proof of email address ownership any time a new user
  // signs up, or when an existing user attempts to change their email address.
  verifyEmailAddresses: false,
  emailProofTokenTTL: 60 * 60 * 1000, // 1 hour
  passwordResetTokenTTL: 60 * 60 * 1000, // 1 hour
  tokenExpiryHours: 1,
};
