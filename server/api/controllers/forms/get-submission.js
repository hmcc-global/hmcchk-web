module.exports = {
  friendlyName: "Retrieve Submissions for a certain form",

  description: "Create a new submission entry from form data",

  inputs: {
    formId: {
      type: "string",
      required: true,
    },
    timeRange: {
      type: "json",
      description: "in YYYY-MM-DD format"
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

  fn: async function ({ formId, timeRange }, exits) {
    try {
      let whereClause = {
        formId: formId,
        isDeleted: false,
      };
      if (timeRange) {
        let tr = JSON.parse(timeRange);
        whereClause["createdAt"] = {
          ">=": new Date(tr.start),
          "<=": new Date(tr.end),
        };
      }

      const data = await Submission.find(whereClause);
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
