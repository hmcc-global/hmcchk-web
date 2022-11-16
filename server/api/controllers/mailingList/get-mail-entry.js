module.exports = {
  friendlyName: 'Add a mailing list entry',

  description: 'check if an email entry exists',

  inputs: {
    email: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'mailing list entry succesfully queried',
    },
  },

  fn: async function ({ email, category }, exits) {
    try {
      const MailingListEntryExists = await MailingListEntry.find({
        email: email,
        category: category,
      });
      if (MailingListEntryExists.length ? true : false) {
        return exits.success(true);
      }
      return exits.success(false);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
