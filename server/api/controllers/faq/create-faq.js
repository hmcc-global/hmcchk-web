module.exports = {
  friendlyName: 'Create FAQ',

  description: 'Create FAQ',

  inputs: {
    pageTopic: {
      type: 'string',
      required: true,
    },
    question: {
      type: 'string',
      required: true,
    },
    answer: {
      type: 'string',
      required: true,
    },
    isPublished: {
      type: 'boolean',
      defaultsTo: false,
    },
  },

  exits: {},

  fn: async function ({ pageTopic, question, answer, isPublished }, exits) {
    const createdBy = this.req.user.fullName;

    try {
      const newFaq = await Faq.create({
        pageTopic,
        question,
        answer,
        createdBy,
        lastUpdatedBy: createdBy,
        isPublished,
      }).fetch();

      if (!newFaq) {
        return exits.error('FAQ not created');
      }

      return exits.success(newFaq);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
