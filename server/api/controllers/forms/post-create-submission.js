module.exports = {
  friendlyName: "Create Submission",

  description: "Create a new submission entry from form data",

  inputs: {
    formId: {
      type: "string",
      required: true,
    },
    userId: {
      type: "string",
    },
    submissionData: {
      type: "json",
      required: true,
      description: "key value pair of saved form data",
    },
  },

  exits: {
    success: {
      description: "Submission is saved successfuly.",
    },
    error: {
      description: "There was an issue with creating the submission",
    },
  },

  fn: async function ({ formId, userId, submissionData }, exits) {
    try {
      const createdSubmission = await Submission.create({
        formId: formId,
        userId: userId,
        submissionData: submissionData,
      });
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
