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
    // this should directly be restricted based on policies.js
    // aboveAdmin only

    // TODO-aparedan: uncomment
    // const user = this.req.user.fullName;

    try {
      let res;

      if (formId) {
        // TODO-aparedan: uncomment
        // sails.log.info(`${user}: Getting payment data for form: ${formId}`);

        res = await PaymentData.find({
          formId: formId,
        }).populateAll();
        if (res.length === 0) throw 'payment data not found';
        return exits.success(res);
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
