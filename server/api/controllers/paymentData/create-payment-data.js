/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Create Payment Data',

  description: 'Create Payment Data',

  inputs: {
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
      description: 'Error creating payment data',
    },
  },

  fn: async function (
    {
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
    sails.log.info(`${user}: Creating payment data: ${name}`);

    try {
      let res;

      res = await PaymentData.create({
        formId,
        userId,
        isPaid,
        paymentDate,
        paymentType,
        paymentMethod,
        remarks,
        isConfirmationEmailSent,
      }).fetch();

      if (!res) {
        return exits.nonSuccess(err);
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
