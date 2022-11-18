const Form = require('../../models/Form');
const PaymentData = require('../../models/PaymentData');

module.exports = {
  friendlyName: 'Send email',

  description: 'Send email',

  inputs: {
    formId: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
    paymentId: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Email is sent successfully.',
    },
    error: {
      description: 'There was an issue with sending the email',
    },
    invalid: {
      description: 'There is an issue with your request',
    },
  },

  fn: async function ({ formId, userId, paymentId }, exits) {
    try {
      //find user's email
      let user,
        form = {};

      if (userId) {
        user = (await sails.helpers.users.getUser(userId))[0];
        if (user === null) {
          return exits.invalid();
        }
      }

      let paymentInfo = await PaymentData.findOne({
        _id: paymentId,
      });

      //find email template for form
      if (formId) {
        form = await Form.findOne({ _id: formId });
        if (form === null) {
          return exits.invalid();
        }
      }

      if (paymentInfo.isPaid == true && paymentInfo.paymentDateTime != null) {
        await sails.helpers.sendTemplateEmail.with({
          to: user.email,
          subject: form.paymentEmailSubject,
          template: form.paymentConfirmationEmailTemplate,
          cc: form.ccEmail,
        });
      }

      await PaymentData.updateOne({ _id: paymentId }).set({
        isConfirmationEmailSent: true,
      });

      // Successfully completed flow
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
