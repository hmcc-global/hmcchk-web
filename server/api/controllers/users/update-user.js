module.exports = {
  friendlyName: 'View users',

  description: '',

  inputs: {
    params: {
      required: false,
      type: 'json'
    }
  },

  exits: {
    success: {
      description: "User account returned successfully",
    },
    invalid : {
      description: "Failed to retrieve user account",
    }
  },
  fn: async function({ userId }, exits) {
    User.updateOne(params.id, params)
  }
}