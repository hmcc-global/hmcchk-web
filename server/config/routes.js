/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "get /api/cache/refresh-cache": "cache/refresh-cache",

  // Announcement APIs
  "get /api/announcements/get-announcements": "announcements/get-announcements",

  // Pages APIs
  "get /api/pages/get-pages": "pages/get-pages",

  // Sermon APIs
  "get /api/sermons/get-sermons": "sermons/get-sermons",
  "get /api/sermons/get-speakers": "sermons/get-speakers",
  "get /api/sermons/get-sermon-series": "sermons/get-sermon-series",
  "get /api/sermons/get-service-types": "sermons/get-service-types",

  // Media APIs
  "get /api/media/get-media": "media/get-media",

  // Auth APIs
  "post /api/auth/login": "auth/post-login",
  "post /api/auth/signup": "auth/post-signup",
  "post /api/auth/signup-google": "auth/post-signup-google",
  
  "get /api/users/get-user": "users/get-user",
  "put /api/users/update-user": "users/update-user",
  "put /api/users/delete-user": "users/delete-user"

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
