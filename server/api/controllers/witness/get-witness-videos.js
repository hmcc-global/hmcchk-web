module.exports = {
    friendlyName: "Get all available Witness Videos",
  
    description: "Get all available Witness Videos",
  
    inputs: {
      id: {
        required: false,
        type: "number",
        description: "Id of witness video",
      },
    },
  
    exits: {
      noData: {
        description: "No data found",
      },
      nonSuccess: {
        description: "Error",
      },
    },
  
    fn: async function ({ id }, exits) {
      sails.log.info(`Get witness videos`);
  
      try {
        let data = await sails.helpers.witness.getWitnessVideos();
        if (id) {
          sails.log.info(`Get witness video with id ${id}`);
          data = data.filter((d) => d.id === id);
          if (data.length === 0) {
            sails.log(`No witness video with id ${id} found.`);
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