module.exports = {
  friendlyName: "Get form route for public use",

  description:
    "Gets all forms if id is not specified, finds a specific one otherwise but checks if the form is published",

  inputs: {
    id: {
      type: "string",
      description: "Id of form",
    },
    isLoggedIn: {
      type: "boolean",
      description: "whether the user is logged in or not",
      required: true,
    },
  },

  exits: {},

  fn: async function ({ id, isLoggedIn }, exits) {
    try {
      let searchParams = {
        _id: id,
        isPublished: true,
        isDeleted: false,
      };

      // If user is not logged in, only allow them to retrieve non login forms
      if (!isLoggedIn) {
        searchParams["requireLogin"] = false;
      }

      const data = await Form.find(searchParams);
      
      // If no form is found return error
      if (data === null) return exits.error("unauthorized access");

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
