module.exports = {

  friendlyName: 'Update Pop Up',

  description: 'Update Pop Up',

  inputs: {
    name: {
      required: true,
      type: 'string'
    },
    title: {
      required: false,
      type: 'string'
    },
    imageLink: {
      required: false,
      type: 'string',
    },
    description: {
      required: false,
      type: 'string',
    },
    buttonTexts: {
      required: false,
      type: 'json',
    },
    buttonLinks: {
      required: false,
      type: 'json',
    },
    isPublished: {
      type: 'boolean'
    },
    isDeleted: {
      type: 'boolean'
    }
  },

  exits: {
    nonSuccess: {
      description: 'Error'
    },
  },

  fn: async function({ name, title, imageLink, description, buttonTexts, buttonLinks, isPublished, isDeleted }, exits) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating popUp: ${name}`);
    sails.log.info(`Title: ${title}, ImageLink: ${imageLink}, Desc: ${description}, ButtonTexts: ${buttonTexts}, ButtonLinks: ${buttonLinks}`);

    try {
      // TODO-aparedan: Do checking that others are not already published
      const existing = await PopUp.updateOne({name}).set({
        title,
        imageLink,
        description,
        buttonTexts,
        buttonLinks,
        isPublished,
        isDeleted
      });

      if (!existing) {
        throw(`Name: ${name}, PopUp doesn't exist yet`);
      }

      return exits.success(existing);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  }
};


