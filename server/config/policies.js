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
  'forms/post-create-form': ['isLoggedIn', 'aboveTech'],
  'forms/post-update-form': ['isLoggedIn', 'aboveTech'],
  'forms/post-delete-form': ['isLoggedIn', 'aboveTech'],
  'forms/admin-get-form': ['isLoggedIn', 'aboveTech'],
  'forms/get-form': true,
  'forms/post-create-submission': true,
  'forms/get-submission': ['isLoggedIn', 'aboveTech'],

  // Last Updated
  'lastUpdated/get-last-updated': ['isLoggedIn', 'aboveAdmin'],

  // Harvest Games
  'harvestGames/update-hg-rankings': ['isLoggedIn', 'aboveTech'],
  'harvestGames/get-hg-rankings': true,
  'harvestGames/create-hg-rankings': true,

  // Media
  'media/*': true,

  // Misc
  'misc/get-env': true,

  // Pages
  'pages/*': true,

  // PopUp
  'popup/get-published-popup': true,
  'popup/create-popup': ['isLoggedIn', 'aboveTech'],
  'popup/get-popup': ['isLoggedIn', 'aboveTech'],
  'popup/update-popup': ['isLoggedIn', 'aboveTech'],

  // Sermons
  'sermons/*': true,

  // Users
  'users/reset': ['isLoggedIn', 'aboveAdmin'],
};
