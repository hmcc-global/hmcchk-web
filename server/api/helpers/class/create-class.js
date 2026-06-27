/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Create class tracking',

  description:
    'Create the ClassTracking record and update LastUpdated for class-required submissions',

  inputs: {
    formId: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
      required: false,
    },
    submissionId: {
      type: 'string',
      required: true,
    },
    updatedBy: {
      type: 'string',
      required: false,
      defaultsTo: 't3chTeam',
    },
    classTrackingBlueprint: {
      type: 'json',
      required: false,
      defaultsTo: null,
    },
  },

  exits: {
    success: {
      description: 'Class tracking created successfully.',
    },
    invalid: {
      description: 'Class tracking could not be created.',
    },
  },

  fn: async function (
    { formId, userId, submissionId, updatedBy, classTrackingBlueprint },
    exits
  ) {
    try {
      const normalizedCourses = Array.isArray(classTrackingBlueprint?.courses)
        ? classTrackingBlueprint.courses.map((course) => ({
            ...course,
            platform: course.platform || null,
            type: course.type || 'online',
            status: course.status || 'Not Started',
            startedAt: course.startedAt || null,
            completedAt: course.completedAt || null,
            lastAccessedAt: course.lastAccessedAt || null,
          }))
        : [];

      let existing = await ClassTracking.create({
        formId,
        userId,
        submissionId,
        tracker: {
          courses: normalizedCourses,
        },
      }).fetch();

      if (!existing) return exits.invalid('classTracking failed to create');

      const modelName = `classTracking-${formId}`;
      existing = await LastUpdated.updateOne({ modelName }).set({
        lastUpdatedBy: updatedBy,
      });

      if (!existing) {
        existing = await LastUpdated.create({
          modelName,
          lastUpdatedBy: updatedBy,
        }).fetch();
      }

      if (!existing) return exits.invalid('LastUpdated failed to update');

      return exits.success(existing);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
