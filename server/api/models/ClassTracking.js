/* eslint-disable linebreak-style */
module.exports = {
  attributes: {
    userId: {
      type: 'string',
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
      defaultsTo: {
        courses: [],
      },
    },
  },
};
