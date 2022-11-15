module.exports = {
  friendlyName: 'Check if user email address exist in form',

  description:
    'Returns true or false if a user email address exist inside form submissions',

  inputs: {
    formId: {
      type: 'string',
      required: true,
    },
    emailAddress: {
      type: 'string',
      isEmail: true,
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Successfully check user email address in form submissions.',
    },
    error: {
      description:
        'There was an internal server issue with checking email address on form submissions.',
    },
    invalid: {
      description: 'Something is wrong with your request. Please check it',
    },
  },

  fn: async function ({ formId, emailAddress }, exits) {
    try {
      let whereClause = {
        formId: formId,
        isDeleted: false,
      };

      const data = await Submission.find(whereClause);
      let userData = data.map((i) => i.submissionData);

      //Extract the email addresses in a set
      const emailSet = new Set(userData.map((i) => i['email']));
      let emailExist = false;

      //If user email already exist redirect return true else false
      if (emailSet.has(emailAddress)) emailExist = true;

      return exits.success(emailExist);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
