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
      // same reused form, so fetch the most recent data for the current season only
      const latestClassDataByFormId = new Map();
      for (const classData of classDataList) {
        if (!latestClassDataByFormId.has(classData.formId)) {
          latestClassDataByFormId.set(classData.formId, classData);
        }
      }
      const formIds = [...latestClassDataByFormId.keys()];

      // 2. Get all forms that are class forms based on classTrackingData
      const forms = await Form.find({
        id: formIds,
        isClass: true,
        isDeleted: false,
      });

      if (!forms || forms.length === 0) return exits.success([]);

      const now = DateTime.now();
      const results = [];

      // 2. For each class form, check if current season and load ClassTrackingData
      for (const form of forms) {
        const availableFrom = form.formAvailableFrom
          ? DateTime.fromJSDate(new Date(form.formAvailableFrom))
          : DateTime.invalid('missing formAvailableFrom');

        const rawClassEndingTime = form.classTrackingTemplate?.classEndingTime;
        const classEndingTime = rawClassEndingTime
          ? DateTime.fromJSDate(new Date(rawClassEndingTime))
          : DateTime.invalid('missing classEndingTime');

        if (!isCurrentSeason(now, availableFrom, classEndingTime)) continue;

        const latestClassData = latestClassDataByFormId.get(form.id);
        if (!latestClassData) continue;

        const createdAt = DateTime.fromJSDate(
          new Date(latestClassData.createdAt)
        );
        const afterStart = availableFrom.isValid
          ? createdAt >= availableFrom
          : true;
        const beforeEnd = classEndingTime.isValid
          ? createdAt <= classEndingTime
          : true;
        if (!afterStart || !beforeEnd) continue;

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
