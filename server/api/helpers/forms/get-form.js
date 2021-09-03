module.exports = {
  friendlyName: "Get form helper function",

  description:
    "Gets all forms if id is not specified, finds a specific one otherwise.",

  inputs: {
    params: {
      type: "json",
      description: "search params for the query"
    },
  },

  exits: {},

  fn: async function ({ params }, exits) {
    try {
      const data = await Form.find().where(params);
      console.log(data);
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
