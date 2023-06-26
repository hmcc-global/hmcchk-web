/* eslint-disable linebreak-style */
module.exports = {
  attributes: {
    formName: {
      type: 'string',
      required: true,
    },
    formFields: {
      type: 'json',
    },
    formType: {
      type: 'string',
      defaultsTo: 'internal',
    },
    isPublished: {
      type: 'boolean',
      defaultsTo: false,
    },
    isPaymentRequired: {
      type: 'boolean',
      defaultsTo: false,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
    requireLogin: {
      type: 'boolean',
      defaultsTo: true,
    },
    successEmailTemplate: {
      type: 'string',
      defaultsTo: 'form-default-success',
    },
    customEmailSubject: {
      type: 'string',
    },
    formAvailableFrom: {
      type: 'string',
      columnType: 'date',
    },
    formAvailableUntil: {
      type: 'string',
      columnType: 'date',
    },
    paymentConfirmationEmailTemplate: {
      type: 'string',
      defaultsTo: '',
    },
    paymentCcEmail: {
      type: 'json',
      defaultsTo: null,
    },
    paymentEmailSubject: {
      type: 'string',
      defaultsTo: '',
    },
    requireMembership: {
      type: 'boolean',
      defaultsTo: false,
    },
    requireBaptism: {
      type: 'boolean',
      defaultsTo: false,
    },
    externalFormLink: {
      type: 'string',
    },
  },
};
