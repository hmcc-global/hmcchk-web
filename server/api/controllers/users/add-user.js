module.exports = {
  friendlyName: 'Add users',
  description: '',
  inputs: {
    user: {
      type: 'json',
      required: 'true',
      description: 'user object',
    }
  },
  exits: {},
  fn: async function( { user }, exits) {
    console.log(user)
    user.email = user.email.toLowerCase();
    user.password = await sails.helpers.passwords.hashPassword(password);
    let newUser = User.create(user);

    console.log(newUser)
    if (newUser) {
      console.log("success")
    } else {
      console.log("fail")
    }
  }
}
