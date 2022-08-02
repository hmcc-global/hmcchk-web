module.exports = {
  friendlyName: 'Get form route for public use',

  description:
    'Gets all forms if id is not specified, finds a specific one otherwise but checks if the form is published',

  inputs: {
    id: {
      type: 'string',
      description: 'Id of form',
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      const data = await Form.find({
        _id: id,
        isPublished: true,
        isDeleted: false,
      });

      // If no form is found return error
      if (data === null) return exits.error('unauthorized access');

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
