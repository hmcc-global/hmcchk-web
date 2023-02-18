/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Update memberships',

  description: 'Update memberships',

  inputs: {
    params: {
      required: false,
      type: 'json',
    },
  },

  exits: {
    success: {
      description: 'Membership records updated successfully',
    },
    invalid: {
      description: 'Failed to update membership record',
    },

    missingRequiredFields: {
      statusCode: 409,
      description: 'Please fill in the required fields.',
    },
  },

  fn: async function ({ params }, exits) {
    console.log(params);
    const { id: membershipId, ...toUpdate } = params;
    if (membershipId) {
      try {
        let data = await Membership.updateOne({
          _id: membershipId,
          isDeleted: false,
        }).set(toUpdate);
        if (data !== null) {
          return exits.success(data);
        }
        return exits.invalid();
      } catch (err) {
        sails.log.error(err);
        return exits.error(err);
      }
    }
    sails.log.error(err);
    sails.log.error('missingRequiredFields');
    return exits.invalid();
  },
};
