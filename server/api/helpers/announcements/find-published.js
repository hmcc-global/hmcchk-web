// Only what the public site renders. The rest of the record (submitter and
// approver names, PPT flags, additional notes, form ids) must not leave the
// server through the public API or the SSR HTML.
const PUBLIC_EVENT_FIELDS = [
  'id',
  'title',
  'description',
  'imageAdUrl',
  'displayStartDateTime',
  'displayEndDateTime',
  'eventStartDate',
  'eventStartTime',
  'eventEndDate',
  'eventEndTime',
  'eventInterval',
  'eventType',
  'featured',
  'location',
  'signUpUrl',
  'directionsUrl',
];

// Datetime fields can come back from sails-mongo as Date objects. Normalise
// them so every consumer gets an ISO string for luxon.
const toPublicEvent = (record) =>
  PUBLIC_EVENT_FIELDS.reduce((publicEvent, field) => {
    const value = record[field];
    if (value !== undefined) {
      publicEvent[field] = value instanceof Date ? value.toISOString() : value;
    }
    return publicEvent;
  }, {});

// The visibility rule for announcements shown on the public site. Shared by the
// public API and the server-rendered events page so they cannot disagree.
module.exports = {
  friendlyName: 'Find published announcements',

  description: 'Find announcements visible on the public site',

  inputs: {
    criteria: {
      type: 'json',
      defaultsTo: {},
      description: 'Extra query criteria, e.g. { _id: id }',
    },
  },

  exits: {
    success: {
      description: 'The matching announcements',
    },
    error: {
      description: 'The query failed',
    },
  },

  fn: async function ({ criteria }, exits) {
    try {
      const data = await Announcement.find({
        ...criteria,
        isInWeb: true,
        isPublished: true,
        isDeleted: false,
      });

      // No `.select()`: the model is `schema: false`, so Waterline rejects a
      // custom select. The whitelist projection happens on the records.
      return exits.success(data.map(toPublicEvent));
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
