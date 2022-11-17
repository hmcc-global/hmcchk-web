const { DateTime } = require('luxon');

/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Update Payment Data',

  description: 'Update Payment Data',

  inputs: {
    id: {
      required: true,
      type: 'string',
    },
    isPaid: {
      required: false,
      type: 'boolean',
    },
    paymentDateTime: {
      required: false,
      type: 'string',
    },
    paymentType: {
      required: false,
      type: 'string',
    },
    paymentMethod: {
      required: false,
      type: 'string',
    },
    remarks: {
      required: false,
      type: 'string',
    },
    isConfirmationEmailSent: {
      required: false,
      type: 'boolean',
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error updating payment data',
    },
    invalidDate: {
      description: 'Invalid date string',
    },
  },

  fn: async function (
    {
      id,
      isPaid,
      paymentDateTime,
      paymentType,
      paymentMethod,
      remarks,
      isConfirmationEmailSent,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating payment data`);

  // TODO-aparedan: Add lastUpdated
    // For checking if the date string is valid
    if (paymentDateTime) {
      const dateFormat = 'yyyy-MM-dd';
      const parsedDate = DateTime.fromFormat(paymentDateTime, dateFormat);

      if (!parsedDate.isValid) {
        return exits.invalidDate('Invalid Date');
      } else {
        // Convert date string to ISO format
        paymentDateTime = parsedDate.toISO();
      }
    }

    try {
      const res = await PaymentData.updateOne({ id }).set({
        isPaid,
        paymentDateTime,
        paymentType,
        paymentMethod,
        remarks,
        isConfirmationEmailSent,
        lastUpdatedBy: user
      });

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
