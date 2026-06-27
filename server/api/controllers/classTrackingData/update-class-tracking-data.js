const { DateTime } = require('luxon');

module.exports = {
  friendlyName: 'Update Class Tracking Data',

  description:
    'Update a single course entry within a class tracking snapshot',

  inputs: {
    id: {
      required: true,
      type: 'string',
      description: 'ClassTrackingData record id',
    },
    courseId: {
      required: true,
      type: 'string',
      description: 'Id of the course entry within the record to update',
    },
    field: {
      required: true,
      type: 'string',
      description: 'Which progress field on the course entry to update',
      // Platform/type are a snapshot set once at submission time, not
      // progress an admin should hand-edit per registrant - so only
      // progress fields are updatable through this endpoint.
      isIn: ['status', 'startedAt', 'completedAt', 'remarks'],
    },
    value: {
      required: false,
      type: 'json',
      description: 'New value for the field',
    },
  },

  exits: {
    nonSuccess: {
      description: 'Error updating class tracking data',
    },
    invalidDate: {
      description: 'Invalid date string',
    },
    invalid: {
      description: 'Failed to update class tracking data',
    },
  },

  fn: async function ({ id, courseId, field, value }, exits) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating class tracking data`);

    let resolvedValue = value;
    if ((field === 'startedAt' || field === 'completedAt') && value) {
      const dateFormat = 'yyyy-MM-dd';
      const parsedDate = DateTime.fromFormat(value, dateFormat);

      if (!parsedDate.isValid) {
        return exits.invalidDate('Invalid Date');
      } else {
        resolvedValue = parsedDate.toISO();
      }
    }

    try {
      const record = await ClassTrackingData.findOne({ id });
      if (!record) {
        return exits.invalid('Class tracking record not found');
      }

      const courseExists = record.courses.some(
        (course) => course.courseId === courseId
      );
      if (!courseExists) {
        return exits.invalid('Course not found on this record');
      }

      const courses = record.courses.map((course) =>
        course.courseId === courseId
          ? { ...course, [field]: resolvedValue }
          : course
      );

      const res = await ClassTrackingData.updateOne({ id }).set({
        courses,
        lastUpdatedBy: user,
      });

      if (!res) {
        return exits.invalid('Class tracking record not found during update');
      }

      const modelName = `classTracking-${res.formId}`;
      let existing = await LastUpdated.updateOne({ modelName })
        .set({
          lastUpdatedBy: user,
        })
        .fetch();

      if (!existing) {
        existing = await LastUpdated.create({
          modelName,
          lastUpdatedBy: user,
        }).fetch();
      }

      if (!existing) return exits.invalid();

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
