module.exports = {
  friendlyName: "Delete form by id",

  description: "Delete form by id",

  inputs: {
    id: {
      type: "string",
      required: true,
      description: "Id of form",
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      const data = await Form.destroy(id);
      return exits.success(id);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
