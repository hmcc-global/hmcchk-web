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
    phoneNumber: {
      description: "phone number of the person filling the form",
      type: "string",
      required: true,
    },
    lifestage: {
      description: "campus/lifestage of the person filling the form",
      type: "string",
      required: true,
    },
    notes: {
      description: "additional notes",
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function ({ email, name, phoneNumber, lifestage, notes }, exits) {
    try {
      await sails.helpers.sendTemplateEmail.with({
        to: sails.config.custom.admin.email,
        subject: "[NEW] Connect Request",
        template: "email-connect-with-us",
        templateData: {
          fullName: name,
          email: email,
          phoneNumber: phoneNumber,
          lifestage: lifestage,
          notes: notes,
        },
      });

      return exits.success();
    } catch (err) {
      return exits.error(err);
    }
  },
};
