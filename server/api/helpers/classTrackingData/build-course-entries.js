module.exports = {
  friendlyName: 'Build course entries',

  description:
    'Build fresh class tracking course entries from form template courses',

  inputs: {
    courses: {
      type: 'ref',
      required: true,
      description: 'Courses from Form.classTrackingTemplate.courses',
    },
  },

  exits: {},

  fn: async function ({ courses }, exits) {
    // Used both at sign-up and when a course is added to a form after people
    // have already signed up, so both paths start a course from the same state.
    const entries = (Array.isArray(courses) ? courses : []).map((course) => ({
      courseId: course.courseId,
      name: course.name,
      platform: course.platform,
      type: course.type,
      courseLink: course.courseLink || '',
      status: sails.config.custom.classProgressStatuses[0],
      startedAt: '',
      completedAt: '',
      remarks: '',
    }));
    return exits.success(entries);
  },
};
