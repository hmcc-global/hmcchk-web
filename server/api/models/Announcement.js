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
    startDate: {
      type: 'string',
      columnType: 'date',
    },
    startTime: {
      type: 'string',
      columnType: 'time',
    },
    endDate: {
      type: 'string',
      columnType: 'date',
    },
    endTime: {
      type: 'string',
      columnType: 'time',
    },
    location: {
      type: 'string',
    },
    imageAdTakedownDate: {
      type: 'ref',
      columnType: 'datetime',
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
