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
      type: 'string',
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
    invalid: {
      description: 'An issue with your request',
      statusCode: 400,
    },
    tooMany: {
      description: 'Too many email requests',
      statusCode: 429,
    },
  },

  fn: async function ({ email, sermonNoteData }, exits) {
    const MAX_NOTE_CHARS = 500000;
    // All windows are 15 minutes (RATE_TTL_SEC below).
    const RECIPIENT_LIMIT = 5; // same destination address, guest or logged-in
    const ACCOUNT_LIMIT = 5; // per logged-in user (bypasses guest pool)
    const GUEST_GLOBAL_LIMIT = 50; // site-wide for unauthenticated sends
    const RATE_TTL_SEC = 15 * 60;

    try {
      if (!sermonNoteData || sermonNoteData.length > MAX_NOTE_CHARS) {
        return exits.invalid('Invalid sermon note payload');
      }

      // Endpoint is public (policies: true). Resolve identity from Authorisation
      // when present so logged-in users use the account bucket; otherwise guest.
      // Do not require JWT — missing/invalid token must still allow guest email.
      let userId = null;
      const authHeader = this.req.headers && this.req.headers.authorisation;
      if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer' && parts[1]) {
          try {
            const user = await sails.helpers.auth.verifyJwt(parts[1]);
            if (user && user.id) {
              userId = user.id;
            }
          } catch (err) {
            // Invalid/expired token → guest quota, not 401.
          }
        }
      }

      // Cap how often any single inbox can be emailed (anti open-relay).
      const toKey = `rl:email-sermon-notes:to:${email.toLowerCase()}`;
      const toHits = sails.cache.get(toKey) || 0;
      if (toHits >= RECIPIENT_LIMIT) {
        return exits.tooMany('Too many email requests');
      }

      // Second bucket: per-account OR shared guest pool (not both).
      // rl: rate limit key
      let quotaKey;
      let quotaHits;
      let quotaLimit;
      if (userId) {
        quotaKey = `rl:email-sermon-notes:user:${userId}`;
        quotaHits = sails.cache.get(quotaKey) || 0;
        quotaLimit = ACCOUNT_LIMIT;
        if (quotaHits >= quotaLimit) {
          return exits.tooMany('Too many email requests');
        }
      } else {
        quotaKey = 'rl:email-sermon-notes:guest-global';
        quotaHits = sails.cache.get(quotaKey) || 0;
        quotaLimit = GUEST_GLOBAL_LIMIT;
        if (quotaHits >= quotaLimit) {
          // Distinct body so the UI can prompt guests to log in.
          return exits.tooMany(
            'Guest email limit reached. Log in to email notes.'
          );
        }
      }

      // TipTap HTML is intentional unescaped content for the email template (<%- data %>).
      await sails.helpers.sendTemplateEmail.with({
        to: email,
        subject: 'Sermon Note',
        template: 'email-user-sermon-note',
        templateData: {
          data: sermonNoteData,
        },
      });

      // Increment only after a successful send so failures do not burn quota.
      sails.cache.set(toKey, toHits + 1, RATE_TTL_SEC);
      sails.cache.set(quotaKey, quotaHits + 1, RATE_TTL_SEC);

      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
