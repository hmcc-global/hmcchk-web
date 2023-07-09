module.exports = {
  friendlyName: 'Create announcement',

  description: 'Create a new announcement',

  inputs: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    imageAdUrl: {
      type: 'string',
      required: true,
    },
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
    submittedBy: { type: 'string' },
    approvedBy: { type: 'string' },
    isPublished: { type: 'boolean' },
  },

  exits: {
    success: {
      description: 'New announcement was created successfully.',
    },
    error: {
      description: 'Failed to create new announcement.',
    },
  },

  fn: async function (
    {
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
      submittedBy,
      approvedBy,
      isPublished,
    },
    exits
  ) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Creating announcement: ${title}`);

    try {
      const res = await Announcement.create({
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
        submittedBy: submittedBy || user,
        approvedBy,
        isPublished,
      }).fetch();

      if (!res) {
        return exits.nonSuccess(err);
      }

      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
