module.exports = {
  attributes: {
    formName: {
      type: "string",
      required: true,
    },
    formFields: {
      type: "json",
    },
    isDeleted: {
      type: "boolean",
      defaultsTo: false,
    },
  },
};
