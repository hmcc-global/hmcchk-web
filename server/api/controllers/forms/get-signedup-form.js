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
      responseType: 'notFound',
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

      const sub = data.map((s) =>
        formData.find((i) => {
          if (i.formAvailableFrom || i.formAvailableUntil) {
            // Do date checking
            let submissionDate = new Date(s.createdAt);

            // Dates might evaluate to invalid date if the value is not set
            let formAvailableFrom = new Date(i.formAvailableFrom);
            let formAvailableUntil = new Date(i.formAvailableUntil);

            // Handle logic accordingly
            // if it is a date, check if submission is within validity period
            // + sanity check that date object is a date and not null
            // if not, by default submission exists for this form and return true
            let signedUpAfterFormOpen =
              formAvailableFrom instanceof Date && !isNaN(formAvailableFrom)
                ? submissionDate >= formAvailableFrom
                : true;
            let signedUpBeforeFormEnd =
              formAvailableUntil instanceof Date && !isNaN(formAvailableUntil)
                ? submissionDate <= formAvailableUntil
                : true;

            return (
              i.id === s.formId &&
              signedUpAfterFormOpen &&
              signedUpBeforeFormEnd
            );
          } else return i.id === s.formId;
        })
      );

      // If no form is found return error
      if (sub === null) return exits.error('unauthorized access');

      return exits.success(sub);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
