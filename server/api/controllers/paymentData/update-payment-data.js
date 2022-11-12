/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Update Payment Data',

  description: 'Update Payment Data',

  inputs: {
    paymentDataId: {
      required: true,
      type: 'string',
    },
    formId: {
      required: true,
      type: 'string',
    },
    userId: {
      required: true,
      type: 'string',
    },
    isPaid: {
      required: false,
      type: 'boolean',
    },
    paymentDate: {
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
      paymentDataId,
      formId,
      userId,
      isPaid,
      paymentDate,
      paymentType,
      paymentMethod,
      remarks,
      isConfirmationEmailSent,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating payment data`);

    // For checking if the date string is valid
    const parsedDate = new Date(Date.parse(paymentDate));

    if (isNaN(parsedDate)) {
      return exits.invalidDate(err);
    } else {
      // Convert date string to ISO format
      paymentDate = parsedDate.toISOString;
    }

    try {
      const res = await PaymentData.updateOne({ paymentDataId }).set({
        formId,
        userId,
        isPaid,
        paymentDate,
        paymentType,
        paymentMethod,
        remarks,
        isConfirmationEmailSent,
      });

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
