module.exports = {

  friendlyName: 'Update Live sermon',

  description: 'Update Live sermon',

  inputs: {
    id: {
      required: true,
      type: 'string'
    },
    title: {
      required: false,
      type: 'string'
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

  fn: async function({id, title}, exits) {
    // const user = this.req.user.fullName;
    // sails.log.info(`${user}: Updating popUp: ${name}`);
    // sails.log.info(`Title: ${title}, ImageLink: ${imageLink}, Desc: ${description}, ButtonTexts: ${buttonTexts}, ButtonLinks: ${buttonLinks}`);

    try {

      // if (isDeleted && isPublished) {
      //   isPublished = false;
      // }

      // if (buttonLinks.length > buttonTexts.length) {
      //   throw('Number of button links cannot exceed number of button texts');
      // }

      // if (isPublished) {
      //   res = await PopUp.update({ isPublished: true })
      //   .set({
      //     isPublished: false
      //   });
      // }

      const existing = await LiveSermon.updateOne({id}).set({
        title
      });

      if (!existing) {
        // throw(`Name: ${name}, PopUp doesn't exist yet`);
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


