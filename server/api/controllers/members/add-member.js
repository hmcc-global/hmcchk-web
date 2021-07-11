module.exports = {
  friendlyName: 'Add members',
  description: '',
  inputs: {
    member: {
      type: 'json',
      required: 'true',
      description: 'member object',
    }
  },
  exits: {},
  fn: async function( { member }, exits) {
    console.log(inputs)
    //for () {}
  }
}
