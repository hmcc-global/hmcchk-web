/**
 * SiteLinkTarget.js
 *
 * One scheduled destination for a SiteLink. Exactly one of `formId` (when
 * destinationType is `form`) or `destinationUrl` (when `url`) is populated.
 *
 * Schedule bounds are Hong Kong wall-clock time carrying a literal `Z` suffix —
 * they are NOT real UTC instants. The resolver compares them against
 * sails.helpers.datetime.getOffsettedTime(), which is also HK wall clock, so the
 * two sides agree. This is a convention, not a constraint: a value written with a
 * real timezone offset would be read eight hours out, so writers must send the
 * same shape the admin UI does.
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
      description:
        'Direct https URL or safe internal path; required when destinationType=url.',
    },
    activeFrom: {
      type: 'string',
      columnType: 'date',
      description:
        'HK wall-clock start labelled Z; empty = immediately active.',
    },
    activeUntil: {
      type: 'string',
      columnType: 'date',
      description: 'HK wall-clock end labelled Z; empty = open-ended.',
    },
    updatedBy: {
      type: 'string',
      description:
        'Full name of the authenticated user who last saved this target.',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
