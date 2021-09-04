module.exports = {
  friendlyName: "Retrieve Submissions for a certain form",

  description: "Create a new submission entry from form data",

  inputs: {
    formId: {
      type: "string",
      required: true,
    },
    params: {
      type: "json",
    },
  },

  exits: {
    success: {
      description: "Successfully retrieved submissions.",
    },
    error: {
      description:
        "There was an internal server issue with retrieving submissions.",
    },
    invalid: {
      description: "Something is wrong with your request. Please check it",
    },
  },

  fn: async function ({ formId, params }, exits) {
    try {
      const data = await Submission.find({ formId: formId, isDeleted: false })
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
