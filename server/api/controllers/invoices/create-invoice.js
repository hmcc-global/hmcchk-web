module.exports = {
  friendlyName: "Create invoice",

  description: "Create an invoice",

  inputs: {
    params: {
      type: "json",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Invoice created successfully",
    },
  },

  fn: async function ({ params }, exits) {
    try {
      const newInvoice = await Invoice.create(params);
      return exits.success(newInvoice);
    } catch (err) {
      sails.log.error(err);
      return exits.error(err);
    }
  },
};
