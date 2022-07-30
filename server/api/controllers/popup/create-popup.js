module.exports = {

  friendlyName: 'Create Pop Up',

  description: 'Create Pop Up',

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
    }
  },

  exits: {
    nonSuccess: {
      description: 'Error'
    },
  },

  fn: async function({ name, title, imageLink, description, buttonTexts, buttonLinks }, exits) {
    const user = this.req.user.fullName;
    sails.log.info(`${user}: Creating popUp: ${name}`);

    try {
      let res = await PopUp.create({
        name,
        title,
        imageLink,
        description,
        buttonTexts,
        buttonLinks
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

