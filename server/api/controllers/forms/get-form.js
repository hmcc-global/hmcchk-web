module.exports = {
  friendlyName: "Get form",

  description:
    "Gets all forms if id is not specified, finds a specific one otherwise.",

  inputs: {
    id: {
      type: "string",
      description: "Id of form",
    },
  },

  exits: {},

  fn: async function ({ id }, exits) {
    try {
      console.log("Id:", id);
      const data = await Form.find().where({ id: id, isDeleted: false });
      console.log(data);
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
