/* eslint-disable linebreak-style */
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
      // Courses no longer have a type (Online/In-Person). A form copied from
      // an older one can still carry it, so strip it rather than store it.
      if (
        formToSave.classTrackingTemplate &&
        Array.isArray(formToSave.classTrackingTemplate.courses)
      ) {
        formToSave.classTrackingTemplate.courses =
          formToSave.classTrackingTemplate.courses.map((course) =>
            _.omit(course, 'type')
          );
      }

      const createdForm = await Form.create(formToSave);
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
