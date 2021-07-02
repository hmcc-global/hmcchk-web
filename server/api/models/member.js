module.exports = {
  attributes: {
    id: {
      type: 'string',
      columnName: '_id'
    },
    createdAt: {
      type: 'number',
      autoCreatedAt: true,
    },
    updatedAt: {
      type: 'number',
      autoUpdatedAt: true,
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
    isMember: {
      type: 'ref',
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
    financeID: {
      type: 'number'
    }
  },
};
