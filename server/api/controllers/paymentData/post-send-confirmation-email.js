const PaymentData = require('../../models/PaymentData');

module.exports = {
  friendlyName: 'Send email',

  description: 'Send email',

  inputs: {
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

  fn: async function ({ userId, paymentId }, exits) {
    try {
      //find user's email
      let user = {};

      if (userId) {
        user = (await sails.helpers.users.getUser(userId))[0];
        if (user === null) {
          return exits.invalid();
        }
      }

      let paymentInfo = await PaymentData.find({
        _id: paymentId,
      });

      //TODO-tamarayustian: Replace email template
      if (paymentInfo.isPaid == true && paymentInfo.paymentDateTime != null) {
        await sails.helpers.sendTemplateEmail.with({
          to: user.email,
          subject: 'PAID',
          template: 'email-payment-success',
          templateData: {
            fullName: user.fullName,
          },
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
