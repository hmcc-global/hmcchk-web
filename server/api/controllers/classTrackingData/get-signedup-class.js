const { DateTime } = require('luxon');

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
        userId: userId,
        isDeleted: false,
      });

      if (!submissions || submissions.length === 0) {
        return exits.success([]);
      }

      const formIds = [...new Set(submissions.map((s) => s.formId))];

      // 2. Load only class forms referenced by those submissions
      const forms = await Form.find({
        id: formIds,
        isClass: true,
        isDeleted: false,
      });

      if (!forms || forms.length === 0) return exits.success([]);

      const now = DateTime.now();
      const results = [];

      // 3. For each class form, check active window and load ClassTrackingData
      for (const form of forms) {
        const availableFrom = DateTime.fromISO(form.formAvailableFrom || '');
        const classEndingTime = DateTime.fromISO(
          form.classTrackingTemplate?.classEndingTime || ''
        );

        const afterFormOpen = availableFrom.isValid
          ? now >= availableFrom
          : true;
        const beforeClassEnd = classEndingTime.isValid
          ? now <= classEndingTime
          : true;
        const isWithinActiveWindow = afterFormOpen && beforeClassEnd;

        if (!isWithinActiveWindow) continue;

        // There should be one ClassTrackingData record per submission; find the
        // record for this user and form. If none exists, skip.
        const classDataFetch = await ClassTrackingData.findOne({
          formId: form.id,
          userId,
        });
        if (!classDataFetch) continue;

        results.push({
          formName: form.formName,
          classTrackingData: classDataFetch,
        });
      }

      return exits.success(results);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
