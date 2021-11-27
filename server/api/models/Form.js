module.exports = {
  attributes: {
    formName: {
      type: "string",
      required: true,
    },
    formFields: {
      type: "json",
    },
    isPublished: {
      type: "boolean",
      defaultsTo: false,
    },
    isDeleted: {
      type: "boolean",
      defaultsTo: false,
    },
    requireLogin: {
      type: "boolean",
      defaultsTo: true,
    },
    successEmailTemplate: {
      type: "string",
      defaultsTo: "form-default-success",
    },
    customEmailSubject: {
      type: "string",
    },
  },
};
