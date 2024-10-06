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
   * Current hierarchy from lowest to highest:                                *
   * - isLoggedIn                                                             *
   * - aboveMinistry                                                          *
   * - aboveTc                                                                *
   * - aboveTcNotTech                                                         *
   * - aboveTech                                                              *
   * - aboveAdmin                                                             *
   * - isStewardship                                                          *
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
  'forms/get-submission': ['isLoggedIn', 'aboveTcNotTech'],
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

  // User Sermon Note
  'userSermonNotes/get-user-sermon-notes': true,
  'userSermonNotes/create-user-sermon-notes': ['isLoggedIn', 'aboveTech'],
  'userSermonNotes/update-user-sermon-notes': ['isLoggedIn', 'aboveTech'],

  // User Sermon Note
  'sermonNotesParent/*': true,

  // Sermons page
  'sermons/get-sermons': true,

  // Media
  'media/*': true,

  // Misc
  'misc/get-env': true,
  'misc/get-current-time': true,
  'leadershipTeam/get-latest-lifegroup-list': true,
  'leadershipTeam/get-latest-campus-list': true,
  'leadershipTeam/get-latest-lifestage-list': true,
  'forms/get-all-form-alert-types': true,

  // Pages
  'pages/*': true,

  // PaymentData
  'paymentData/*': ['isLoggedIn', 'aboveAdmin'],

  // PopUp
  'popup/get-published-popup': true,
  'popup/create-popup': ['isLoggedIn', 'aboveTech'],
  'popup/get-popup': ['isLoggedIn', 'aboveTech'],
  'popup/update-popup': ['isLoggedIn', 'aboveTech'],

  // Testimonies
  'testimonies/get-testimonies': ['isLoggedIn', 'aboveTech'],
  'testimonies/update-testimonies': ['isLoggedIn', 'aboveTech'],
  'testimonies/get-published-testimonies': true,
  'testimonies/create-testimonies': true,

  // LeadershipTeam
  'leadershipTeam/*': ['isLoggedIn', 'aboveAdmin'],

  // Harvest Games
  'harvestGames/get-hg-rankings': true,
  'harvestGames/update-hg-rankings': ['isLoggedIn', 'aboveTech'],
  'harvestGames/get-hg-passwords': true,

  // Users
  'users/reset': ['isLoggedIn', 'aboveAdmin'],
};
