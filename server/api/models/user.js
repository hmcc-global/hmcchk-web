module.exports = {
  attributes: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    accessType: {
      type: 'string'
    },
    fullName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    campus: {
      type: 'string',
      required: true
    },
    lifestage: {
      type: 'string',
      required: true
    },
    LIFEgroup: {
      type: 'string'
    },
    isMember: {
      type: 'boolean',
      defaultsTo: false
    },
    isBaptised: {
      type: 'boolean',
      defaultsTo: false
    },
    phoneNumber: {
      type: 'number',
      required: true
    },
    classesTaken: {
      type: 'json'
    },
    eventsJoined: {
      type: 'json'
    },
    membershipID: {
      type: 'ref'
    },
    baptismID: {
      type: 'ref'
    },
    financeID: {
      type: 'json'
    }
  },
};
