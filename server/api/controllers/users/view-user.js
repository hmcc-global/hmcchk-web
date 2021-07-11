module.exports = {
    friendlyName: 'View users',

    description: '',

    inputs: {},

    exits: {
      success: {
        description: "User account returned successfully",
      },
      invalid : {
        description: "Failed to retrieve user account",
      }
    },
    fn: async function(inputs, exits) {
      console.log(inputs);
    }
  }