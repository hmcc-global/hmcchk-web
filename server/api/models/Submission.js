module.exports = {
  attributes: {
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
    },
    isDeleted: {
      type: "boolean",
      defaultsTo: false,
    },
  },
};
