module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    imageAdUrl: {
      type: 'string',
      required: true,
    },
    isInWeb: {
      type: 'boolean',
      defaultsTo: false,
    },
    isInPpt: {
      type: 'boolean',
      defaultsTo: false,
    },
    displayStartDateTime: {
      type: 'ref',
      columnType: 'datetime',
    },
    displayEndDateTime: {
      type: 'ref',
      columnType: 'datetime',
    },
    eventStartDate: {
      type: 'string',
      columnType: 'date',
    },
    eventStartTime: {
      type: 'string',
      columnType: 'time',
    },
    eventEndDate: {
      type: 'string',
      columnType: 'date',
    },
    eventEndTime: {
      type: 'string',
      columnType: 'time',
    },
    eventInterval: {
      type: 'string',
      isIn: ['Daily', 'Weekly', 'Monthly', 'None'],
      defaultsTo: 'None',
      description: 'Recurring event interval if any.',
    },
    location: {
      type: 'string',
    },
    formId: {
      type: 'string',
    },
    signUpUrl: {
      type: 'string',
    },
    directionsUrl: {
      type: 'string',
    },
    additionalNotes: {
      type: 'string',
    },
    submittedBy: {
      type: 'string',
    },
    lastUpdatedBy: {
      type: 'string',
    },
    approvedBy: {
      type: 'string',
    },
    isPublished: {
      type: 'boolean',
      defaultsTo: false,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
