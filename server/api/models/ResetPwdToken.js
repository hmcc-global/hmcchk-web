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
    expiresAt: {
      type: "number",
      required: true,
      example: 1502844074211,
    },
    used: {
      type: "boolean",
      defaultsTo: false,
    },
  },
};
