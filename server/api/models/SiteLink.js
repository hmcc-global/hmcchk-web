/**
 * SiteLink.js
 *
 * The permanent public identity for a managed redirect, e.g. `/go/life-group`.
 * Its scheduled destinations live in the SiteLinkTarget model.
 */

module.exports = {
  attributes: {
    key: {
      type: 'string',
      required: true,
      unique: true,
      description: 'Stable identifier, e.g. life-group.',
    },
    label: {
      type: 'string',
      required: true,
      description: 'Admin-facing label, e.g. LIFE Group Signup.',
    },
    slug: {
      type: 'string',
      required: true,
      unique: true,
      description: 'Public slug used in /go/:slug.',
    },
    isEnabled: {
      type: 'boolean',
      defaultsTo: true,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
