const { DateTime } = require('luxon');

const isCurrentSeason = (dateTime, start, end) => {
  const afterStart = start.isValid ? dateTime >= start : true;
  const beforeEnd = end.isValid ? dateTime <= end : true;
  return afterStart && beforeEnd;
};

module.exports = {
  friendlyName: 'Get signed up classes for user',

  description:
    'Gets all classes a user has signed up for and returns each class status based on form availability and ending time',

  inputs: {
    userId: {
      type: 'string',
      required: true,
      description: 'User',
    },
  },

  exits: {
    success: {
      description: 'Successfully return user signed up classes.',
    },
    error: {
      description:
        'There was an internal server issue with retrieving user classes.',
    },
    invalid: {
      description: 'Something is wrong with your request. Please check it',
    },
  },

  fn: async function ({ userId }, exits) {
    try {
      // 1. Find submissions for the user to know which forms they've signed up for
      const submissions = await Submission.find({
        userId,
        isDeleted: false,
      });

      if (!submissions || submissions.length === 0) {
        return exits.success([]);
      }

      const submissionsByFormId = new Map();
      for (const submission of submissions) {
        const list = submissionsByFormId.get(submission.formId) || [];
        list.push(submission);
        submissionsByFormId.set(submission.formId, list);
      }
      const formIds = [...submissionsByFormId.keys()];

      // 2. Load only class forms referenced by those submissions
      const forms = await Form.find({
        id: formIds,
        isClass: true,
        isDeleted: false,
      });

      if (!forms || forms.length === 0) return exits.success([]);

      const now = DateTime.now();
      const results = [];

      // 3. For each class form, check if current season and load ClassTrackingData
      for (const form of forms) {
        const availableFrom = DateTime.fromISO(form.formAvailableFrom || '');
        const classEndingTime = DateTime.fromISO(
          form.classTrackingTemplate?.classEndingTime || ''
        );

        if (!isCurrentSeason(now, availableFrom, classEndingTime)) continue;

        // A user can have ClassTrackingData from older seasons of the
        // same reused form, so fetch the most recent data for the current season only
        const [latestClassData] = await ClassTrackingData.find({
          formId: form.id,
          userId,
          createdAt: {
            '>=': availableFrom.toJSDate(),
            '<=': classEndingTime.toJSDate(),
          },
        })
          .sort('createdAt DESC')
          .limit(1);

        if (!latestClassData) continue;

        results.push({
          formName: form.formName,
          classTrackingData: latestClassData,
        });
      }

      return exits.success(results);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
