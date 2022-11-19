module.exports = {
  attributes: {
    formId: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
    },
    submissionData: {
      type: 'json',
      required: true,
    },
    paymentData: {
      collection: 'PaymentData',
      via: 'submissionId'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
