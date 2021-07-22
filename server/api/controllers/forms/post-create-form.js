module.exports = {
  friendlyName: "Create Form",

  description: "Create a new form",

  inputs: {
    formToSave: {
      type: "json",
      required: true,
      description: "form saved object",
    },
  },

  exits: {
    success: {
      description: "New form was created successfully.",
    },
    error: {
      description: "Failed to create new form.",
    },
  },

  fn: async function ({ formToSave }, exits) {
    try {
      const createdForm = await Form.create(formToSave);
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
