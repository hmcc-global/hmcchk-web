module.exports = {
  attributes: {
    formId: {
      model: 'Submission',
      required: true
    },
    userId: {
      type: 'string',
      required: true
    },
    paymentType: {
      type: 'string',
    }
  },
};


