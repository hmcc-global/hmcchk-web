module.exports = {

  friendlyName: 'Update Pop Up',

  description: 'Update Pop Up',

  inputs: {
    id: {
      required: true,
      type: 'string'
    },
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
    duplicateError: {
      description: 'Duplicate data found',
      statusCode: 409,
    }
  },

  fn: async function({ id, name, title, imageLink, description, buttonTexts, buttonLinks, isPublished, isDeleted }, exits) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Updating popUp: ${name}`);
    sails.log.info(`Title: ${title}, ImageLink: ${imageLink}, Desc: ${description}, ButtonTexts: ${buttonTexts}, ButtonLinks: ${buttonLinks}`);

    try {

      if (isDeleted && isPublished) {
        isPublished = false;
      }

      if (buttonLinks.length > buttonTexts.length) {
        throw('Number of button links cannot exceed number of button texts');
      }

      if (isPublished) {
        res = await PopUp.update({ isPublished: true })
        .set({
          isPublished: false
        });
      }

      const existing = await PopUp.updateOne({id}).set({
        name,
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
      if (err.code === 'E_UNIQUE') {
        return exits.duplicateError(err);
      }
      return exits.nonSuccess(err);
    }
  }
};


