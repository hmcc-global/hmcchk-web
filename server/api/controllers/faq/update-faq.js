module.exports = {
  friendlyName: 'Update FAQ',

  description: 'Update FAQ',

  inputs: {
    id: {
      required: true,
      type: 'string',
    },
    pageTopic: {
      type: 'string',
    },
    question: {
      required: false,
      type: 'string',
    },
    answer: {
      type: 'string',
    },

    isPublished: {
      type: 'boolean',
    },
    isDeleted: {
      type: 'boolean',
    },
  },

  exits: {
    duplicateError: {
      description: 'Duplicate data found',
    },
  },

  fn: async function ({ id, pageTopic, question, answer, isPublished, isDeleted }, exits) {
    const user = this.req.user.fullName;

    try {
      let lastUpdatedBy = user;

      const existingFaq = await Faq.updateOne({ _id: id }).set({
        pageTopic,
        question,
        answer,
        lastUpdatedBy,
        isPublished,
        isDeleted,
      });

      if (!existingFaq) {
        return exits.error('FAQ not found');
      }

      return exits.success(existingFaq);
    } catch (err) {
      sails.log(err);

      if (err.code === 'E_UNIQUE') {
        return exits.duplicateError(err);
      }
      return exits.error(err);
    }
  },
};
