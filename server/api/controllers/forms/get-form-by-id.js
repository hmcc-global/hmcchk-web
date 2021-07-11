module.exports = {
  friendlyName: 'Get form by id',

  description: 'Get form by id',

  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Id of form'
    }
  },

  exits: {},

  fn: async function({ id }, exits) {
    try {
      const data = await Form.find(id);
      return exits.success(data);
    }
    catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  }
};