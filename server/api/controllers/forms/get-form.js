module.exports = {
  friendlyName: "Get form route for public use",

  description:
    "Gets all forms if id is not specified, finds a specific one otherwise but checks if the form is published",

  inputs: {
    id: {
      type: "string",
      description: "Id of form",
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
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
