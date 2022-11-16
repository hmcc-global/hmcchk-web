module.exports = {
  friendlyName: 'Return user form submission data',

  description:
    'Returns user form submission data',

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
      description: 'Successfully return user form submission.',
    },
    error: {
      description:
        'There was an internal server issue with retrieving user form submission.',
    },
    notFound: {
      description: 'No userId found',
      responseType: 'notFound'
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
      if (!data) return exits.success({});

      const sub = data.find(i => i.userId === userId);
      if (!sub) return exits.success({});

      return exits.success(sub);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
