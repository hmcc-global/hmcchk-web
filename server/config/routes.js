/* eslint-disable linebreak-style */
let path = require('path');
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

  'get /api/cache/refresh-cache': 'cache/refresh-cache',
  'get /api/misc/get-env': 'misc/get-env',
  'get /api/misc/get-current-time': 'misc/get-current-time',
  'get /api/misc/get-latest-lifegroup-list':
    'leadershipTeam/get-latest-lifegroup-list',
  'get /api/misc/get-latest-campus-list':
    'leadershipTeam/get-latest-campus-list',
  'get /api/misc/get-latest-lifestage-list':
    'leadershipTeam/get-latest-lifestage-list',

  // Forms APIs
  'get /api/forms/get-form': 'forms/get-form',
  'get /api/forms/get-signedup-form': 'forms/get-signedup-form',
  'get /api/forms/get-unsignedup-form': 'forms/get-unsignedup-form',
  'get /api/forms/admin-get-form': 'forms/admin-get-form',
  'get /api/forms/all-form-alert-types': 'forms/get-all-form-alert-types',
  'post /api/forms/post-create-form': 'forms/post-create-form',
  'post /api/forms/post-update-form': 'forms/post-update-form',
  'post /api/forms/post-delete-form': 'forms/post-delete-form',
  'post /api/forms/connect-with-us': 'forms/post-contact-us-form',

  // Submission APIs
  'post /api/forms/post-create-submission': 'forms/post-create-submission',
  'get /api/forms/get-submission': 'forms/get-submission',
  'get /api/forms/get-user-submission': 'forms/get-user-submission',

  // Payment Data APIs
  'get /api/paymentData/get': 'paymentData/get-payment-data',
  'post /api/paymentData/create': 'paymentData/create-payment-data',
  'put /api/paymentData/update': 'paymentData/update-payment-data',
  'put /api/paymentData/send-email': 'paymentData/post-send-payment-email',

  // Announcement APIs
  'get /api/announcements/get-announcements': 'announcements/get-announcements',

  // Witness Video APIs
  'get /api/witness/get-witness-videos': 'witness/get-witness-videos',

  // Pages APIs
  'get /api/pages/get-pages': 'pages/get-pages',

  //Live Sermon APIs
  'get /api/live-sermon/get-live-sermon': 'liveSermon/get-live-sermon',
  'post /api/live-sermon/create-live-sermon': 'liveSermon/create-live-sermon',
  'put /api/live-sermon/update-live-sermon': 'liveSermon/update-live-sermon',

  // Sermon APIs
  'get /api/sermons/get-sermons': 'sermons/get-sermons',
  'get /api/sermons/get-speakers': 'sermons/get-speakers',
  'get /api/sermons/get-sermon-series': 'sermons/get-sermon-series',
  'get /api/sermons/get-service-types': 'sermons/get-service-types',
  'get /api/sermons/get-sermon-notes': 'sermons/get-sermon-notes',

  // User Sermon APIs
  'get /api/user-sermon-notes/get': 'userSermonNotes/get-user-sermon-notes',
  'post /api/user-sermon-notes/create':
    'userSermonNotes/create-user-sermon-notes',
  'put /api/user-sermon-notes/update':
    'userSermonNotes/update-user-sermon-notes',
  'put /api/user-sermon-notes/delete':
    'userSermonNotes/delete-user-sermon-notes',
  'post /api/email-user-sermon-notes':
    'userSermonNotes/email-user-sermon-notes',

  // Media APIs
  'get /api/media/get-media': 'media/get-media',

  // Auth APIs
  'post /api/auth/login': 'auth/post-login',
  'post /api/auth/login-google': 'auth/post-login-google',
  'post /api/auth/signup': 'auth/post-signup',
  'post /api/auth/signup-google': 'auth/post-signup-google',
  'post /api/auth/confirm-email': 'auth/post-confirm-email',
  'post /api/auth/verify-token/': 'auth/verify-token',
  'post /api/auth/forgot-password': 'auth/post-forgot-password',
  'post /api/auth/change-password-recovery':
    'auth/post-change-password-recovery',

  // User APIs
  'get /api/users/get': 'users/get-user',
  'put /api/users/update': 'users/update-user',
  'put /api/users/delete': 'users/delete-user',
  'post /api/users/reset': 'users/reset-user',
  'post /api/users/change-password': 'users/post-change-password',

  // Baptism APIs
  'post /api/baptism/create': 'baptisms/create-baptism',
  'get /api/baptism/get': 'baptisms/get-baptism',
  'put /api/baptism/update': 'baptisms/update-baptism',
  'put /api/baptism/delete': 'baptisms/delete-baptism',

  // Membership APIs
  'post /api/membership/create': 'memberships/create-membership',
  'get /api/membership/get': 'memberships/get-membership',
  'put /api/membership/update': 'memberships/update-membership',
  'put /api/membership/delete': 'memberships/delete-membership',

  // Last Updated APIs
  'get /api/last-updated': 'lastUpdated/get-last-updated',

  // PopUp APIs
  'get /api/popup/get': 'popup/get-popup',
  'get /api/popup/get-published': 'popup/get-published-popup',
  'post /api/popup/create': 'popup/create-popup',
  'put /api/popup/update': 'popup/update-popup',

  // Testimonies APIs
  'get /api/testimony/get': 'testimonies/get-testimonies',
  'get /api/testimony/get-published': 'testimonies/get-published-testimonies',
  'post /api/testimony/create': 'testimonies/create-testimonies',
  'put /api/testimony/update': 'testimonies/update-testimonies',

  // Announcements APIs
  'get /api/announcement/get': 'announcements/get-announcements-new',
  'get /api/announcement/admin-get': 'announcements/admin-get-announcements',
  'post /api/announcement/create': 'announcements/create-announcements',
  'put /api/announcement/update': 'announcements/update-announcements',

  // Leadership Team APIs
  'get /api/leadership-team/get': 'leadershipTeam/get-leadership-team',
  'post /api/leadership-team/create': 'leadershipTeam/create-leadership-team',
  'put /api/leadership-team/update': 'leadershipTeam/update-leadership-team',

  // Sermon Notes Parent APIs
  'get /api/sermon-notes-parent/latest': 'sermonNotesParent/get-latest',
  'get /api/sermon-notes-parent/get':
    'sermonNotesParent/get-sermon-notes-parent',
  'post /api/sermon-notes-parent/create':
    'sermonNotesParent/create-sermon-notes-parent',
  'put /api/sermon-notes-parent/update':
    'sermonNotesParent/update-sermon-notes-parent',
  'put /api/sermon-notes-parent/delete':
    'sermonNotesParent/delete-sermon-notes-parent',

  // Fundraise APIs
  'get /api/fundraise/get': 'fundraise/get-fundraise',
  'get /api/fundraise/admin-get': 'fundraise/admin-get-fundraise',
  'post /api/fundraise/create': 'fundraise/create-fundraise',
  'put /api/fundraise/update': 'fundraise/update-fundraise',

  // UI
  'get /*': {
    skipAssets: true,
    fn: function (req, res) {
      res.sendFile(path.join(__dirname + '/../client/index.html'));
    },
  },

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
