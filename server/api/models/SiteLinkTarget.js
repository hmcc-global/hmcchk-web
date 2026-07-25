/**
 * SiteLinkTarget.js
 *
 * One scheduled destination for a SiteLink. Exactly one of `formId` (when
 * destinationType is `form`) or `destinationUrl` (when `url`) is populated.
 * Timestamps are stored in UTC and displayed in the admin UI in HK time.
 */

module.exports = {
  attributes: {
    siteLink: {
      type: 'string',
      required: true,
      description: 'Id of the SiteLink this target belongs to.',
    },
    destinationType: {
      type: 'string',
      isIn: ['form', 'url'],
      required: true,
    },
    formId: {
      type: 'string',
      description: 'Referenced Form id; required when destinationType=form.',
    },
    destinationUrl: {
      type: 'string',
      description: 'Direct https URL or safe internal path; required when destinationType=url.',
    },
    activeFrom: {
      type: 'ref',
      columnType: 'datetime',
      description: 'UTC start; empty = immediately active.',
    },
    activeUntil: {
      type: 'ref',
      columnType: 'datetime',
      description: 'UTC end; empty = open-ended.',
    },
    updatedBy: {
      type: 'string',
      description: 'Full name of the authenticated user who last saved this target.',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
