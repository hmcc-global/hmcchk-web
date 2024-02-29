module.exports = {
  friendlyName: 'Get all available Announcements',

  description: 'Get all available Announcements',

  inputs: {
    id: {
      required: false,
      type: 'number',
      description: 'Id of announcement',
    },
  },

  exits: {
    noData: {
      description: 'No data found',
    },
    nonSuccess: {
      description: 'Error',
    },
  },

  async fn({ id }, exits) {
    sails.log.info(`Get announcements`);

    try {
      let data = await sails.helpers.announcements.getAnnouncements();
      if (id) {
        sails.log.info(`Get announcement with id ${id}`);
        data = data.filter((d) => d.id === id);
        if (data.length === 0) {
          sails.log(`No announcement with id ${id} found.`);
          return exits.noData(data);
        }
        return exits.success(data);
      }

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.nonSuccess(err);
    }
  },
};
