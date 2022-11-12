/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Get baptisms',

  description: 'Get baptisms',

  inputs: {
    baptismId: {
      required: false,
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'Baptism records returned successfully',
    },
    invalid: {
      description: 'Failed to retrieve baptism record',
    },
  },
  fn: async function ({ baptismId }, exits) {
    try {
      if (baptismId) {
        let data = await Baptism.find({ _id: baptismId, isDeleted: false });
        if (data.length === 0) throw 'baptism record not found';
        return exits.success(data);
      }

      let data = await Baptism.find({ isDeleted: false });
      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
