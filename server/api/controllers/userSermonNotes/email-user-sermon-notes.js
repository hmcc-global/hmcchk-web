module.exports = {
  friendlyName: 'Email user sermon note',

  description: 'Email user sermon note to their email address',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
    },
    sermonNoteData: {
      type: 'json',
      required: true,
      description: 'TipTap HTML string of sermon note',
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
    const MAX_NOTE_CHARS = 500000;
    const RATE_LIMIT = 5;
    const RATE_TTL_SEC = 15 * 60;

    try {
      const html =
        typeof sermonNoteData === 'string' ? sermonNoteData : '';

      if (!html || html.length > MAX_NOTE_CHARS) {
        return exits.invalied('Invalid sermon note payload');
      }

      const rateKey = `rl:email-sermon-notes:${this.req.ip}`;
      const hits = sails.cache.get(rateKey) || 0;
      if (hits >= RATE_LIMIT) {
        return exits.invalied('Too many email requests');
      }
      sails.cache.set(rateKey, hits + 1, RATE_TTL_SEC);

      // TipTap HTML is intentional unescaped content for the email template (<%- data %>).
      await sails.helpers.sendTemplateEmail.with({
        to: email,
        subject: 'Sermon Note',
        template: 'email-user-sermon-note',
        templateData: {
          data: html,
        },
      });

      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
