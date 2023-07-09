module.exports = {
  friendlyName: 'Update announcement',

  description: 'Update an announcement',

  inputs: {
    id: {
      required: true,
      type: 'string',
    },
    title: { type: 'string' },
    description: { type: 'string' },
    imageAdUrl: { type: 'string' },
    isInWeb: { type: 'boolean' },
    isInPpt: { type: 'boolean' },
    displayStartDateTime: { type: 'string' },
    displayEndDateTime: { type: 'string' },
    eventStartDate: { type: 'string' },
    eventStartTime: { type: 'string' },
    eventEndDate: { type: 'string' },
    eventEndTime: { type: 'string' },
    location: { type: 'string' },
    imageAdTakedownDate: { type: 'string' },
    formId: { type: 'string' },
    signUpUrl: { type: 'string' },
    directionsUrl: { type: 'string' },
    additionalNotes: { type: 'string' },
    lastUpdatedBy: { type: 'string' },
    approvedBy: { type: 'string' },
    isPublished: { type: 'boolean' },
    isDeleted: { type: 'boolean' },
  },

  exits: {
    success: {
      description: 'Announcement updated.',
    },
    error: {
      description: 'Failed to update announcement.',
    },
    invalidId: {
      statusCode: 409,
      description: 'The id is invalid',
    },
    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function (
    {
      id,
      title,
      description,
      imageAdUrl,
      isInWeb,
      isInPpt,
      displayStartDateTime,
      displayEndDateTime,
      eventStartDate,
      eventStartTime,
      eventEndDate,
      eventEndTime,
      location,
      imageAdTakedownDate,
      formId,
      signUpUrl,
      directionsUrl,
      additionalNotes,
      lastUpdatedBy,
      approvedBy,
      isPublished,
      isDeleted,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating announcement: ${title}`);

    if (id) {
      try {
        // if someone pressed delete, but it was published, unpublish it
        if (isDeleted && isPublished) {
          isPublished = false;
        }

        // if someone pressed publish, but it wasn't approved, approve it
        // and do NOT set the lastUpdatedBy to the approvedBy
        if (isPublished && !approvedBy) {
          approvedBy = user;
        } else {
          // only when information is updated or deleted, update the lastUpdatedBy
          lastUpdatedBy = user;
        }

        const existing = await Announcement.updateOne({ id }).set({
          title,
          description,
          imageAdUrl,
          isInWeb,
          isInPpt,
          displayStartDateTime,
          displayEndDateTime,
          eventStartDate,
          eventStartTime,
          eventEndDate,
          eventEndTime,
          location,
          imageAdTakedownDate,
          formId,
          signUpUrl,
          directionsUrl,
          additionalNotes,
          lastUpdatedBy,
          approvedBy,
          isPublished,
          isDeleted,
        });

        if (!existing) {
          sails.log.error('invalidId');
          return exits.error(err);
        }

        return exits.success(existing);
      } catch (err) {
        sails.log(err);
        return exits.error(err);
      }
    }
    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
