module.exports = {
  friendlyName: "Update form by id",

  description: "Update form by id",

  inputs: {
    id: {
      type: "string",
      required: true,
      description: "Id of form",
    },
    formToSave: {
      type: "json",
      required: true,
      description: "Updated JSON data",
    },
  },

  exits: {
    invalidCourseRemoval: {
      description:
        "Cannot remove a course that already has class tracking data; deactivate it instead",
    },
  },

  fn: async function ({ id, formToSave }, exits) {
    try {
      if (formToSave.courses) {
        const existingForm = await Form.findOne({ id });
        const existingCourseIds = (existingForm.courses || []).map(
          (course) => course.courseId
        );
        const newCourseIds = formToSave.courses.map(
          (course) => course.courseId
        );
        const removedCourseIds = existingCourseIds.filter(
          (courseId) => !newCourseIds.includes(courseId)
        );

        if (removedCourseIds.length > 0) {
          const trackedCount = await ClassTrackingData.count({
            formId: id,
            'courses.courseId': { in: removedCourseIds },
          });

          if (trackedCount > 0) {
            return exits.invalidCourseRemoval(
              'Cannot remove a course that already has class tracking data; deactivate it instead'
            );
          }
        }
      }

      const updatedForm = await Form.updateOne(id).set(formToSave);
      if (!updatedForm) {
        return exits.error("Invalid id");
      }
      return exits.success(updatedForm);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
