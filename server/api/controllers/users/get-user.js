module.exports = {
<<<<<<< HEAD
  friendlyName: "View users",

  description: "",
=======
  friendlyName: 'View users',

  description: '',
>>>>>>> 7737213a820b65013d4eb59906db101cc8d74d67

  inputs: {
    userId: {
      required: false,
<<<<<<< HEAD
      type: "string",
    },
=======
      type: 'string'
    }
>>>>>>> 7737213a820b65013d4eb59906db101cc8d74d67
  },

  exits: {
    success: {
      description: "User account returned successfully",
    },
<<<<<<< HEAD
    invalid: {
      description: "Failed to retrieve user account",
    },
  },
  fn: async function ({ userId }, exits) {
    try {
      if (userId) {
        let data = await User.find(userId);
        if (data.length === 0) throw "user not found";
=======
    invalid : {
      description: "Failed to retrieve user account",
    }
  },
  fn: async function({ userId }, exits) {
    try {
      if (userId) {
        let data = await User.find(userId);
        if (data.length === 0) throw('user not found');
>>>>>>> 7737213a820b65013d4eb59906db101cc8d74d67
        return exits.success(data);
      }

      let data = await User.find();
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
<<<<<<< HEAD
  },
};
=======
  }
}
>>>>>>> 7737213a820b65013d4eb59906db101cc8d74d67
