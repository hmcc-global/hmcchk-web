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
    console.log(id);
    try {
      const data = await Form.updateOne(id).set({ isDeleted: true });
      console.log(data);
      if (!data) {
        return exits.error("Invalid id");
      }

      return exits.success(id);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
