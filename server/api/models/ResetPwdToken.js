module.exports = {
  attributes: {
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    token: {
      type: "string",
      required: true,
    },
    used: {
      type: "boolean",
      defaultsTo: false,
    },
  },
};
