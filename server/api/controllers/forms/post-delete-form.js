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
      let temp = await Form.find().where({ id: id, isDeleted: false });
      if (!temp) {
        return exits.error("Invalid id");
      }

      temp = temp[0];
      temp = { formName: temp.formName, formFields: temp.formFields };
      temp.isDeleted = true;
      const data = await Form.updateOne(id).set(temp);

      return exits.success(id);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
