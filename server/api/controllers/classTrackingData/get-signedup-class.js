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

      // A user can have ClassTrackingData from older seasons of the
      // same reused form, so only records that fall within the form's current
      // season window should count, then keep the most recent one per formId
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

      // 3. For each class form, check the current season window, then pick the
      // latest ClassTrackingData whose createdAt falls inside that window
      for (const form of forms) {
        const rawClassStartTime = form.classTrackingTemplate?.classStartTime;
        const classStartTime = rawClassStartTime
          ? DateTime.fromJSDate(new Date(rawClassStartTime))
          : DateTime.invalid('missing classStartTime');

        const rawClassEndingTime = form.classTrackingTemplate?.classEndingTime;
        const classEndingTime = rawClassEndingTime
          ? DateTime.fromJSDate(new Date(rawClassEndingTime))
          : DateTime.invalid('missing classEndingTime');

        // Skip forms whose season window does not cover the current moment
        if (!isCurrentSeason(now, classStartTime, classEndingTime)) continue;

        // classDataList is sorted createdAt DESC, so the first in-window record
        // encountered for a formId is the most recent one. Filtering before
        // deduping avoids dropping a valid in-window record that an older
        // season's newer record would otherwise shadow.
        const latestClassData = classDataList.find(
          (classData) =>
            classData.formId === form.id &&
            isCurrentSeason(
              DateTime.fromJSDate(new Date(classData.createdAt)),
              classStartTime,
              classEndingTime
            )
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
