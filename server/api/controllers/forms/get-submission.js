module.exports = {
  friendlyName: 'Retrieve Submissions for a certain form',

  description: 'Create a new submission entry from form data',

  inputs: {
    formId: {
      type: 'string',
      required: true,
    },
    timeRange: {
      type: 'json',
      description:
        'is an object with a start and end, sample here: \
      { \
        start: YYYY-MM-DD, \
        end: YYYY-MM-DD \
      }',
    },
  },

  exits: {
    success: {
      description: 'Successfully retrieved submissions.',
    },
    error: {
      description:
        'There was an internal server issue with retrieving submissions.',
    },
    invalid: {
      description: 'Something is wrong with your request. Please check it',
    },
  },

  fn: async function ({ formId, timeRange }, exits) {
    const accessType = this.req.user.accessType;
    const viewPaymentDataAccess = sails.config.custom.permissions.viewPaymentData;

    try {
      let whereClause = {
        formId: formId,
        isDeleted: false,
      };
      if (timeRange) {
        let tr = JSON.parse(timeRange);
        whereClause['createdAt'] = {
          '>=': new Date(tr.start),
          '<=': new Date(tr.end),
        };
      }

      let data;
      if (viewPaymentDataAccess.includes(accessType)) {
        data = await Submission.find(whereClause).populate('paymentData');
        return exits.success(data);
      }

      data = await Submission.find(whereClause);
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
