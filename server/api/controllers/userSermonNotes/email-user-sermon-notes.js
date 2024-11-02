module.exports = {
  friendlyName: 'Email user sermon note',

  description: 'Email user sermon note to their email address',

  inputs: {
    email: {
      type: 'string',
    },
    sermonNoteData: {
      type: 'json',
      required: true,
      description: 'json format of sermon note',
    },
  },

  exits: {
    success: {
      description: 'Emailed sermon note successfully.',
    },
    error: {
      description: 'An issue in sending sermon note through email.',
    },
    invalied: {
      description: 'An issue with your request',
    },
  },

  fn: async function ({ email, sermonNoteData }, exits) {
    try {
      if (email) {
        await sails.helpers.sendTemplateEmail.with({
          to: email,
          subject: 'Sermon Note',
          template: 'email-user-sermon-note',
          templateData: {
            data: sermonNoteData,
          },
        });
      }

      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
