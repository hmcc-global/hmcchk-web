module.exports = {
  friendlyName: 'Add members',
  description: '',
  inputs: {
    member: {
      description: '',
      type: [{
          fullName: 'string',
          email: 'string',
          campus: 'string',
          lifestage: 'string',
          isMember: 'boolean',
          isBaptised: 'boolean',
          phoneNumber: 'number',
          //classesTaken: 'json'
      }]
    }
  },
  exits: {},
  fn: async function(inputs, exits) {
    let { member } = inputs
    //for () {}
  }
}
