module.exports = {

  friendlyName: 'Create Live Sermon',

  description: 'Create Live Sermon',

  inputs: {
    title:{
      type: 'string',
      required: true,
     },
  },

  exits: {
    nonSuccess: {
      description: 'Error'
    },
  },

  fn: async function({  title }, exits) {
    // const user = this.req.user.fullName;
    // sails.log.info(`${user}: Creating live sermon: ${name}`);

    try {
      let res;

      // if (isPublished) {
      //   res = await PopUp.update({ isPublished: true })
      //   .set({
      //     isPublished: false
      //   });
      // }

      // if (buttonLinks.length > buttonTexts.length) {
      //   throw('Number of button links cannot exceed number of button texts');
      // }

      res = await LiveSermon.create({   
        title,
      }).fetch();

      if (!res) {
        return exits.nonSuccess(err);
      }

      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  }
};

