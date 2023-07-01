module.exports = {
  attributes: {
    title: {
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
    description: {
      type: 'string',
    },
    imageAdUrl: {
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
    submitterId: {
      type: 'string',
      required: true,
    },
    approvedBy: {
      type: 'string',
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
