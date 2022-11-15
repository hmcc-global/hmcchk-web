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
    // TODO-aparedan: Uncomment this once the permission properly applied
    // const user = this.req.user.fullName;
    // sails.log.info(`${user}: Updating payment data`);

    // For checking if the date string is valid
    console.log(paymentDateTime);
    const parsedDate = new Date(Date.parse(paymentDateTime));

    if (isNaN(parsedDate)) {
      return exits.invalidDate(err);
    } else {
      // Convert date string to ISO format
      paymentDateTime = parsedDate.toISOString();
    }

    try {
      const res = await PaymentData.updateOne({ id }).set({
        isPaid,
        paymentDateTime,
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
