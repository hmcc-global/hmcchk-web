module.exports = {
  friendlyName: 'Get signed up form route for public use',

  description:
    'Gets all signed up forms from specified user id, but checks if the form is published',

  inputs: {
    userId: {
      type: 'string',
      required: true,
      description: 'Id of form',
    },
  },

  exits: {
    success: {
      description: 'Successfully return user signed up form.',
    },
    error: {
      description:
        'There was an internal server issue with retrieving user forms.',
    },
    notFound: {
      description: 'No userId found',
      responseType: 'notFound'
    },
    invalid: {
      description: 'Something is wrong with your request. Please check it',
    },
  },

  fn: async function ({ userId }, exits) {
    try {
      const data = await Submission.find({
        userId: userId,
        isDeleted: false,
      });

      const formData = await Form.find({
        isPublished: true,
        isDeleted: false,
      });

      const sub = data.map( s => formData.find( i => i.id === s.formId ))
      const final = formData.filter((i) => !sub.includes(i))
      // If no form is found return error
      if (final === null) return exits.error('unauthorized access');

      return exits.success(final);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
