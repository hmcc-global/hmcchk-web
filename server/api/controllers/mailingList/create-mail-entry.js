module.exports = {
  friendlyName: 'Add a mailing list entry',

  description: 'submit an email',

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
      description: 'email succesfully added',
    },
  },

  fn: async function ({ email, category }, exits) {
    try {
      const newMailingListEntry = await MailingListEntry.create({
        email,
        category,
      });

      return exits.success(newMailingListEntry);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};