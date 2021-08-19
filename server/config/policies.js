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
  "*": "isLoggedIn",

  // Public controllers

  // Announcements
  "announcements/*": true,

  // Auth
  "auth/post-login": true,
  "auth/post-login-google": true,
  "auth/post-signup": true,
  "auth/post-signup-google": true,
  "auth/verify-token": true,

  // Cache
  "cache/*": ["isLoggedIn", "isAdmin"],

  // Forms
  "/forms/post-create-form": ["isLoggedIn", "isAdmin"],
  "/forms/post-update-form": ["isLoggedIn", "isAdmin"],
  "/forms/post-delete-form": ["isLoggedIn", "isAdmin"],

  // Media
  "media/*": true,

  // Pages
  "pages/*": true,

  // Sermons
  "sermons/*": true,
};
