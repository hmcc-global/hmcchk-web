module.exports = {
  friendlyName: 'Retrieve all users submission for a certain form',

  description: 'Create a new user submission entry from form data',

  inputs: {
    formId: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
      required: true,
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

  fn: async function ({ formId, userId }, exits) {
    try {
      let whereClause = {
        formId: formId,
        isDeleted: false,
      };

      const data = await Submission.find(whereClause);
      let userData = data.map((i) => i.submissionData);

      //Extract the email addresses in a set
      const emailSet = new Set(userData.map((i) => i['email']));

      //If user email already exist redirect return true else false
      if (emailSet.has(userId)) {
        return true;
      } else return false;
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
