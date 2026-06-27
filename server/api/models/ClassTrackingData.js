module.exports = {
  attributes: {
    formId: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
    },
    submissionId: {
      model: 'Submission',
      unique: true,
    },
    courses: {
      type: 'json',
      defaultsTo: [],
      description:
        'Snapshot of course progress, seeded from Form.courses at submission time. ' +
        'Each item: { courseId, name, platform, type, status, startedAt, completedAt, remarks }',
    },
    lastUpdatedBy: {
      type: 'string',
    },
  },
};
