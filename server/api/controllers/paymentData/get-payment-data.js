/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Get Payment Data',

  description: 'Get Payment Data',

  inputs: {
    formId: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error getting payment data',
    },
  },

  fn: async function ({ formId }, exits) {
    const user = this.req.user.fullName;

    try {
      let res;

      if (formId) {
        sails.log.info(`${user}: Getting payment data for form: ${formId}`);

        res = await PaymentData.find({
          formId: formId,
        }).populateAll();
        if (data.length === 0) throw 'payment data not found';
        return exits.success(data);
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
