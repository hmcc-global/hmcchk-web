/* eslint-disable linebreak-style */
module.exports = {
  attributes: {
    formId: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
      required: true,
    },
    submissionId: {
      model: 'Submission',
      unique: true
    },
    isPaid: {
      type: 'boolean',
      defaultsTo: false,
    },
    paymentDateTime: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: null,
    },
    paymentType: {
      type: 'string',
      defaultsTo: '',
    },
    paymentMethod: {
      type: 'string',
      isIn: ['FPS', 'Cash', 'Cheque', 'Credit Card', 'Bank Transfer', ''],
      defaultsTo: '',
    },
    remarks: {
      type: 'string',
      defaultsTo: '',
    },
    isConfirmationEmailSent: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
