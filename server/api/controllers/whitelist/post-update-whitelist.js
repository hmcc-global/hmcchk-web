module.exports = {
  friendlyName: 'Update whitelist by id',

  description: 'Update whitelist by id',

  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Id of form',
    },
    eventName: {
      type: 'string',
      required: true,
      description: 'Updated event name',
    },
    data: {
      type: 'json',
      required: true,
      description: 'Updated JSON data',
    },
  },

  exits: {},

  fn: async function ({ id, eventName, data }, exits) {
    try {
      console.log('received id', id);
      const updatedWhitelist = await Whitelist.updateOne(id).set({
        eventName: eventName,
        data: data,
      });
      if (!updatedWhitelist) {
        return exits.error('Invalid id');
      }
      return exits.success(updatedWhitelist);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
