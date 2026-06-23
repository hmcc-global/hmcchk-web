/* eslint-disable linebreak-style */
module.exports = {
  attributes: {
    userId: {
      type: 'string',
      unique: true,
    },
    classId: {
      type: 'string',
      unique: true,
    },
    formId: {
      type: 'string',
      unique: true,
    },
    submissionId: {
      model: 'Submission',
      unique: true,
    },
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
    tracker: {
      type: 'json',
      courses: {
        type: 'json',
        columnType: 'array',
        materialId: {
          type: 'string',
          unique: true,
        },
        platform: {
          type: 'string',
        },
        type: {
          type: 'string',
          isIn: ['online', 'offline'],
          defaultsTo: 'online',
        },
        status: {
          type: 'string',
          isIn: ['Not Started', 'In Progress', 'Completed'],
          defaultsTo: 'Not Started',
        },
        startedAt: {
          type: 'string',
        },
        completedAt: {
          type: 'string',
        },
        lastAccessedAt: {
          type: 'string',
        },
      },
    },
  },
};
