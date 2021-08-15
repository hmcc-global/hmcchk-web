module.exports = {
  friendlyName: "Forwards Contact Us email to HMCC Admins",

  description:
    "Receives an email, name and optional notes, forwards to HMCC Admin",

  inputs: {
    email: {
      description: "email of the person filling the form",
      type: "string",
      isEmail: true,
      required: true,
    },
    name: {
      description: "name of the person filling the form",
      type: "string",
      required: true,
    },
    notes: {
      description: "additional notes",
      type: "string",
    },
  },

  exits: {},

  fn: async function ({ email, name, notes }, exits) {
    try {
      await sails.helpers.sendTemplateEmail.with({
        to: sails.config.custom.admin.email,
        subject: "[NEW] Connect Request",
        template: "email-connect-with-us",
        templateData: {
          fullName: name,
          email: email,
          notes: notes,
        },
      });

      return exits.success();
    } catch (err) {
      return exits.error(err);
    }
  },
};
