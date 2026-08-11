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
      const classPlatformTypes = sails.config.custom.classPlatformTypes;
      if (
        formToSave.classTrackingTemplate &&
        formToSave.classTrackingTemplate.courses
      ) {
        formToSave.classTrackingTemplate.courses =
          formToSave.classTrackingTemplate.courses.map((course) => {
            if (course.platform && classPlatformTypes[course.platform]) {
              return { ...course, type: classPlatformTypes[course.platform] };
            }
            return course;
          });
      }

      const createdForm = await Form.create(formToSave);
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
