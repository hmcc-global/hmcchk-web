const { DateTime } = require('luxon');

const CLASS_STATUS_LIST = ['Not Started', 'In Progress', 'Completed'];
const REMARKS_MAX_LENGTH = 100;
const DATE_FORMAT = 'yyyy-MM-dd';

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
    invalidValue: {
      description: 'The supplied value is not valid for this field',
    },
    courseInactive: {
      description: 'Cannot update tracking data for an archived course',
    },
  },

  fn: async function ({ id, courseId, field, value }, exits) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating class tracking data`);

    try {
      // `field` is whitelisted by the isIn above, but `value` arrives as free-form
      // json - validate it per field so the grid can't write junk into a snapshot.
      const isBlank = value === null || value === undefined || value === '';
      let resolvedValue = value;

      if (field === 'status') {
        if (!CLASS_STATUS_LIST.includes(value)) {
          return exits.invalidValue(
            `Status must be one of: ${CLASS_STATUS_LIST.join(', ')}`
          );
        }
      } else if (field === 'remarks') {
        // Clearing remarks is legitimate.
        if (isBlank) {
          resolvedValue = '';
        } else if (typeof value !== 'string') {
          return exits.invalidValue('Remarks must be text');
        } else if (value.length > REMARKS_MAX_LENGTH) {
          return exits.invalidValue(
            `Remarks must be ${REMARKS_MAX_LENGTH} characters or fewer`
          );
        }
      } else {
        // startedAt / completedAt - clearing a date is legitimate.
        if (isBlank) {
          resolvedValue = '';
        } else if (typeof value !== 'string') {
          return exits.invalidDate('Invalid Date');
        } else {
          const parsedDate = DateTime.fromFormat(value, DATE_FORMAT);
          if (!parsedDate.isValid) {
            return exits.invalidDate('Invalid Date');
          }
          resolvedValue = parsedDate.toISO();
        }
      }

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

      const form = await Form.findOne({ id: record.formId });
      const templateCourse = (
        (form && form.classTrackingTemplate
          ? form.classTrackingTemplate.courses
          : []) || []
      ).find((course) => course.courseId === courseId);
      if (templateCourse && !templateCourse.isActive) {
        return exits.courseInactive(
          'Cannot update tracking data for an archived course'
        );
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
      // No .fetch() - updateOne() already returns the affected record, and
      // asking for it again makes Waterline log a warning on every edit.
      let existing = await LastUpdated.updateOne({ modelName }).set({
        lastUpdatedBy: user,
      });

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
