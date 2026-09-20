const { DateTime } = require('luxon');

module.exports = {
  friendlyName: 'Get signed up classes for user',

  description:
    'Gets all classes a user has signed up for and returns each class status based on form availability and ending time',

  inputs: {},

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

  fn: async function (inputs, exits) {
    try {
      const userId = this.req.user.id;

      // 1. Get all class tracking data for the user
      const classDataList = await ClassTrackingData.find({
        userId,
      }).sort('createdAt DESC');

      if (!classDataList || classDataList.length === 0) {
        return exits.success([]);
      }

      // A user can have ClassTrackingData from older seasons of the same
      // reused form. A record belongs to the current season only if it was
      // created while the form's sign-up window was open, so enforce that as
      // the season boundary instead of the class schedule (sign-ups typically
      // happen before the class starts).
      const formIds = [...new Set(classDataList.map((cd) => cd.formId))];

      // 2. Get all forms that are class forms based on classTrackingData
      const forms = await Form.find({
        id: formIds,
        isPublished: true,
        isClass: true,
        isDeleted: false,
      });

      if (!forms || forms.length === 0) return exits.success([]);

      const now = DateTime.now();
      const results = [];

      // 3. For each class form, gate visibility on the class having begun,
      // then pick the most recent ClassTrackingData from the current season.
      for (const form of forms) {
        const rawClassStartTime = form.classTrackingTemplate?.classStartTime;
        const classStartTime = rawClassStartTime
          ? DateTime.fromJSDate(new Date(rawClassStartTime))
          : DateTime.invalid('missing classStartTime');

        // Don't surface progress before the class starts. Once it has begun -
        // or when no start time is configured - keep showing it even after the
        // class ends so users can review their final statuses.
        if (classStartTime.isValid && now < classStartTime) continue;

        // classDataList is sorted createdAt DESC, so the first record that
        // matches keeps the most recent sign-up. A record created before the
        // form's sign-up window opened belongs to an older, reused season.
        const availableFrom = new Date(form.formAvailableFrom);
        const hasAvailableFrom =
          availableFrom instanceof Date && !isNaN(availableFrom);

        const latestClassData = classDataList.find(
          (classData) =>
            classData.formId === form.id &&
            (!hasAvailableFrom ||
              new Date(classData.createdAt) >= availableFrom)
        );
        if (!latestClassData) continue;

        results.push({
          formId: form.id,
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
