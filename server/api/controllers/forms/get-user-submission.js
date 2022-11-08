module.exports = {
  friendlyName: 'Retrieve all users submission for a certain form',

  description: 'Create a new user submission entry from form data',

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
      description: 'Successfully retrieved user submissions.',
    },
    error: {
      description:
        'There was an internal server issue with retrieving user submissions.',
    },
    invalid: {
      description: 'Something is wrong with your request. Please check it',
    },
  },

  fn: async function ({ formId, timeRange }, exits) {
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

      const data = await Submission.find(whereClause);
      let userData = data.map((i) => i.submissionData);
      return exits.success(userData);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
