module.exports = {
  attributes: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    accessType: {
      type: 'string' //stewardship, admin, or member
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
    lifeGroup: {
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
    membershipId: {
      type: 'ref'
    },
    baptismId: {
      type: 'ref'
    },
    financeId: {
      type: 'json'
    }
  },
};
