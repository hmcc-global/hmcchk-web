/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/
  '*': 'isLoggedIn',

  // Public controllers

  // Announcements
  'announcements/*': true,
  'witness/*': true,
  'testimonies/*': true,

  // Auth
  'auth/post-login': true,
  'auth/post-login-google': true,
  'auth/post-signup': true,
  'auth/post-signup-google': true,
  'auth/verify-token': true,
  'auth/post-confirm-email': true,
  'auth/post-forgot-password': true,
  'auth/post-change-password-recovery': true,

  // Forms
  'forms/post-contact-us-form': true,

  // Cache
  'cache/*': ['isLoggedIn', 'aboveTech'],

  // Forms
  'forms/post-create-form': ['isLoggedIn', 'aboveTc'],
  'forms/post-update-form': ['isLoggedIn', 'aboveTc'],
  'forms/post-delete-form': ['isLoggedIn', 'aboveTc'],
  'forms/admin-get-form': ['isLoggedIn', 'aboveTc'],
  'forms/get-form': true,
  'forms/get-signedup-form': ['isLoggedIn'],
  'forms/get-unsignedup-form': ['isLoggedIn'],
  'forms/post-create-submission': true,
  'forms/get-submission': ['isLoggedIn', 'aboveTc'],
  'forms/get-user-submission': ['isLoggedIn'],

  // Announcements
  'announcements/admin-get-announcements': ['isLoggedIn', 'aboveMinistry'],
  'announcements/create-announcements': ['isLoggedIn', 'aboveTc'],
  'announcements/update-announcements': ['isLoggedIn', 'aboveMinistry'],

  // Last Updated
  'lastUpdated/get-last-updated': ['isLoggedIn', 'aboveTech'],

  // Live Sermon
  'liveSermon/get-live-sermon': true,
  'liveSermon/create-live-sermon': ['isLoggedIn', 'aboveTech'],
  'liveSermon/update-live-sermon': ['isLoggedIn', 'aboveTech'],

  // Media
  'media/*': true,

  // Misc
  'misc/get-env': true,
  'misc/get-current-time': true,

  // Pages
  'pages/*': true,

  // PaymentData
  'paymentData/*': ['isLoggedIn', 'aboveAdmin'],

  // PopUp
  'popup/get-published-popup': true,
  'popup/create-popup': ['isLoggedIn', 'aboveTech'],
  'popup/get-popup': ['isLoggedIn', 'aboveTech'],
  'popup/update-popup': ['isLoggedIn', 'aboveTech'],

  // Sermons
  'sermons/*': true,

  // Testimonies
  'testimonies/get-testimonies': ['isLoggedIn', 'aboveTech'],
  'testimonies/update-testimonies': ['isLoggedIn', 'aboveTech'],
  'testimonies/get-published-testimonies': true,
  'testimonies/create-testimonies': true,

  // Harvest Games
  'harvestGames/get-hg-rankings': ['isLoggedIn', 'aboveTech'],
  'harvestGames/update-hg-rankings': ['isLoggedIn', 'aboveTech'],

  // Users
  'users/reset': ['isLoggedIn', 'aboveAdmin'],
};
