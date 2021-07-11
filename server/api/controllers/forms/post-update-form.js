module.exports = {
    friendlyName: 'Update form by id',
  
    description: 'Update form by id',
  
    inputs: {
      id: {
        type: 'string',
        required: true,
        description: 'Id of form'
      },
      formToSave: {
          type: 'json',
          required: true,
          description: 'Updated JSON data'
      }
    },
  
    exits: {},
  
    fn: async function({ id, formToSave }, exits) {
      try {
        const updatedForm = await Form.updateOne(id).set(formToSave);
        return exits.success(updatedForm);
      }
      catch (err) {
        sails.log(err);
        return exits.error(err);
      }
    }
  };