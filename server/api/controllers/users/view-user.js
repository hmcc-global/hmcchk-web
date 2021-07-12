module.exports = {
  friendlyName: 'View users',

  description: '',

  inputs: {
    userId: {
      required: false,
      type: 'string'
    }
  },

  exits: {
    success: {
      description: "User account returned successfully",
    },
    fn: async function(inputs, exits) {
      console.log(inputs);
    }
  }
}