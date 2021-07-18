module.exports = {
  friendlyName: "Get All Forms",

  description: "Get all available forms",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    try {
      const data = await Form.find();
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
